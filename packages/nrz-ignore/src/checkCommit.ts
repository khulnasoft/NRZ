import { execSync } from "node:child_process";

export const skipAllCommits = [
  `[skip ci]`,
  `[ci skip]`,
  `[no ci]`,
  `[skip khulnasoft]`,
  `[khulnasoft skip]`,
];

export const forceAllCommits = [`[khulnasoft deploy]`, `[khulnasoft build]`];

export function skipWorkspaceCommits({ workspace }: { workspace: string }) {
  return [`[khulnasoft skip ${workspace}]`];
}

export function forceWorkspaceCommits({ workspace }: { workspace: string }) {
  return [`[khulnasoft deploy ${workspace}]`, `[khulnasoft build ${workspace}]`];
}

export const onlyWorkspaceRegex = /\[khulnasoft only .+\]/;

export function onlyWorkspaceCommits({ workspace }: { workspace: string }) {
  return [`[khulnasoft only ${workspace}]`];
}

export function getCommitDetails() {
  // if we're on Khulnasoft, use the provided commit message
  if (process.env.KHULNASOFT === "1") {
    if (process.env.KHULNASOFT_GIT_COMMIT_MESSAGE) {
      return process.env.KHULNASOFT_GIT_COMMIT_MESSAGE;
    }
  }
  return execSync("git show -s --format=%B").toString();
}

export function checkCommit({ workspace }: { workspace: string }): {
  result: "skip" | "deploy" | "continue" | "conflict";
  scope: "global" | "workspace";
  reason: string;
} {
  const commitMessage = getCommitDetails();
  const findInCommit = (commit: string) => commitMessage.includes(commit);

  // only mode first
  const onlyWorkspaceDeployMatch = onlyWorkspaceRegex.exec(commitMessage)?.[0];
  if (onlyWorkspaceDeployMatch) {
    if (
      onlyWorkspaceCommits({ workspace }).find(
        (commit) => commit === onlyWorkspaceDeployMatch
      )
    ) {
      return {
        result: "deploy",
        scope: "workspace",
        reason: `Found commit message: ${onlyWorkspaceDeployMatch}`,
      };
    }
    return {
      result: "skip",
      scope: "workspace",
      reason: `Found commit message: ${onlyWorkspaceDeployMatch}`,
    };
  }

  // check other workspace specific messages
  const forceWorkspaceDeploy = forceWorkspaceCommits({ workspace }).find(
    findInCommit
  );
  const forceWorkspaceSkip = skipWorkspaceCommits({ workspace }).find(
    findInCommit
  );

  if (forceWorkspaceDeploy && forceWorkspaceSkip) {
    return {
      result: "conflict",
      scope: "workspace",
      reason: `Conflicting commit messages found: ${forceWorkspaceDeploy} and ${forceWorkspaceSkip}`,
    };
  }

  if (forceWorkspaceDeploy) {
    return {
      result: "deploy",
      scope: "workspace",
      reason: `Found commit message: ${forceWorkspaceDeploy}`,
    };
  }

  if (forceWorkspaceSkip) {
    return {
      result: "skip",
      scope: "workspace",
      reason: `Found commit message: ${forceWorkspaceSkip}`,
    };
  }

  // check global messages last
  const forceDeploy = forceAllCommits.find(findInCommit);
  const forceSkip = skipAllCommits.find(findInCommit);

  if (forceDeploy && forceSkip) {
    return {
      result: "conflict",
      scope: "global",
      reason: `Conflicting commit messages found: ${forceDeploy} and ${forceSkip}`,
    };
  }

  if (forceDeploy) {
    return {
      result: "deploy",
      scope: "global",
      reason: `Found commit message: ${forceDeploy}`,
    };
  }

  if (forceSkip) {
    return {
      result: "skip",
      scope: "global",
      reason: `Found commit message: ${forceSkip}`,
    };
  }

  return {
    result: "continue",
    scope: "global",
    reason: `No deploy or skip string found in commit message.`,
  };
}
