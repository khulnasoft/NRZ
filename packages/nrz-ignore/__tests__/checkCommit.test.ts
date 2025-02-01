// eslint-disable-next-line camelcase -- this is a good exception to this rule
import child_process from "node:child_process";
import { mockEnv } from "@nrz/test-utils";
import { describe, it, expect, jest } from "@jest/globals";
import { checkCommit } from "../src/checkCommit";

describe("checkCommit()", () => {
  describe("on Khulnasoft", () => {
    mockEnv();

    describe("for all workspaces", () => {
      it("results in continue when no special commit messages are found", () => {
        process.env.KHULNASOFT = "1";
        process.env.KHULNASOFT_GIT_COMMIT_MESSAGE = "fixing a test";
        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "continue",
          scope: "global",
          reason: "No deploy or skip string found in commit message.",
        });
      });

      it("results in conflict when deploy and skip commit messages are found", () => {
        process.env.KHULNASOFT = "1";
        process.env.KHULNASOFT_GIT_COMMIT_MESSAGE =
          "deploying [khulnasoft deploy] and skipping [khulnasoft skip]";
        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "conflict",
          scope: "global",
          reason:
            "Conflicting commit messages found: [khulnasoft deploy] and [khulnasoft skip]",
        });
      });

      it("results in deploy when deploy commit message is found", () => {
        process.env.KHULNASOFT = "1";
        process.env.KHULNASOFT_GIT_COMMIT_MESSAGE = "deploying [khulnasoft deploy]";
        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "deploy",
          scope: "global",
          reason: "Found commit message: [khulnasoft deploy]",
        });
      });

      it("results in skip when skip commit message is found", () => {
        process.env.KHULNASOFT = "1";
        process.env.KHULNASOFT_GIT_COMMIT_MESSAGE = "skip deployment [khulnasoft skip]";
        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "skip",
          scope: "global",
          reason: "Found commit message: [khulnasoft skip]",
        });
      });
    });

    describe("for specific workspaces", () => {
      it("results in continue when no special commit messages are found", () => {
        process.env.KHULNASOFT = "1";
        process.env.KHULNASOFT_GIT_COMMIT_MESSAGE =
          "fixing a test in test-workspace";
        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "continue",
          scope: "global",
          reason: "No deploy or skip string found in commit message.",
        });
      });

      it("results in conflict when deploy and skip commit messages are found", () => {
        process.env.KHULNASOFT = "1";
        process.env.KHULNASOFT_GIT_COMMIT_MESSAGE =
          "deploying [khulnasoft deploy test-workspace] and skipping [khulnasoft skip test-workspace]";
        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "conflict",
          scope: "workspace",
          reason:
            "Conflicting commit messages found: [khulnasoft deploy test-workspace] and [khulnasoft skip test-workspace]",
        });
      });

      it("results in deploy when deploy commit message is found", () => {
        process.env.KHULNASOFT = "1";
        process.env.KHULNASOFT_GIT_COMMIT_MESSAGE =
          "deploying [khulnasoft deploy test-workspace]";
        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "deploy",
          scope: "workspace",
          reason: "Found commit message: [khulnasoft deploy test-workspace]",
        });
      });

      it("results in skip when skip commit message is found", () => {
        process.env.KHULNASOFT = "1";
        process.env.KHULNASOFT_GIT_COMMIT_MESSAGE =
          "skip deployment [khulnasoft skip test-workspace]";
        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "skip",
          scope: "workspace",
          reason: "Found commit message: [khulnasoft skip test-workspace]",
        });
      });

      it("results in deploy when deploy only is found", () => {
        process.env.KHULNASOFT = "1";
        process.env.KHULNASOFT_GIT_COMMIT_MESSAGE =
          "deploying [khulnasoft only test-workspace]";
        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "deploy",
          scope: "workspace",
          reason: "Found commit message: [khulnasoft only test-workspace]",
        });
      });

      it("results in skip when deploy not match workspace", () => {
        process.env.KHULNASOFT = "1";
        process.env.KHULNASOFT_GIT_COMMIT_MESSAGE =
          "deploying [khulnasoft only test-workspace]";
        expect(checkCommit({ workspace: "test-workspace2" })).toEqual({
          result: "skip",
          scope: "workspace",
          reason: "Found commit message: [khulnasoft only test-workspace]",
        });
      });
    });
  });
  describe("Not on Khulnasoft", () => {
    describe("for all workspaces", () => {
      it("results in continue when no special commit messages are found", () => {
        const commitBody = "fixing a test";
        const mockExecSync = jest
          .spyOn(child_process, "execSync")
          .mockImplementation((_) => commitBody);

        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "continue",
          scope: "global",
          reason: "No deploy or skip string found in commit message.",
        });
        expect(mockExecSync).toHaveBeenCalledWith("git show -s --format=%B");
        mockExecSync.mockRestore();
      });

      it("results in conflict when deploy and skip commit messages are found", () => {
        const commitBody =
          "deploying [khulnasoft deploy] and skipping [khulnasoft skip]";
        const mockExecSync = jest
          .spyOn(child_process, "execSync")
          .mockImplementation((_) => commitBody);

        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "conflict",
          scope: "global",
          reason:
            "Conflicting commit messages found: [khulnasoft deploy] and [khulnasoft skip]",
        });
        expect(mockExecSync).toHaveBeenCalledWith("git show -s --format=%B");
        mockExecSync.mockRestore();
      });

      it("results in deploy when deploy commit message is found", () => {
        const commitBody = "deploying [khulnasoft deploy]";
        const mockExecSync = jest
          .spyOn(child_process, "execSync")
          .mockImplementation((_) => commitBody);

        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "deploy",
          scope: "global",
          reason: "Found commit message: [khulnasoft deploy]",
        });
        expect(mockExecSync).toHaveBeenCalledWith("git show -s --format=%B");
        mockExecSync.mockRestore();
      });

      it("results in skip when skip commit message is found", () => {
        const commitBody = "skip deployment [khulnasoft skip]";
        const mockExecSync = jest
          .spyOn(child_process, "execSync")
          .mockImplementation((_) => commitBody);

        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "skip",
          scope: "global",
          reason: "Found commit message: [khulnasoft skip]",
        });
        expect(mockExecSync).toHaveBeenCalledWith("git show -s --format=%B");
        mockExecSync.mockRestore();
      });
    });

    describe("for specific workspaces", () => {
      it("results in continue when no special commit messages are found", () => {
        const commitBody = "fixing a test in test-workspace";
        const mockExecSync = jest
          .spyOn(child_process, "execSync")
          .mockImplementation((_) => commitBody);

        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "continue",
          scope: "global",
          reason: "No deploy or skip string found in commit message.",
        });
        expect(mockExecSync).toHaveBeenCalledWith("git show -s --format=%B");
        mockExecSync.mockRestore();
      });

      it("results in conflict when deploy and skip commit messages are found", () => {
        const commitBody =
          "deploying [khulnasoft deploy test-workspace] and skipping [khulnasoft skip test-workspace]";
        const mockExecSync = jest
          .spyOn(child_process, "execSync")
          .mockImplementation((_) => commitBody);

        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "conflict",
          scope: "workspace",
          reason:
            "Conflicting commit messages found: [khulnasoft deploy test-workspace] and [khulnasoft skip test-workspace]",
        });
        expect(mockExecSync).toHaveBeenCalledWith("git show -s --format=%B");
        mockExecSync.mockRestore();
      });

      it("results in deploy when deploy commit message is found", () => {
        const commitBody = "deploying [khulnasoft deploy test-workspace]";
        const mockExecSync = jest
          .spyOn(child_process, "execSync")
          .mockImplementation((_) => commitBody);

        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "deploy",
          scope: "workspace",
          reason: "Found commit message: [khulnasoft deploy test-workspace]",
        });
        expect(mockExecSync).toHaveBeenCalledWith("git show -s --format=%B");
        mockExecSync.mockRestore();
      });

      it("results in skip when skip commit message is found", () => {
        const commitBody = "skip deployment [khulnasoft skip test-workspace]";
        const mockExecSync = jest
          .spyOn(child_process, "execSync")
          .mockImplementation((_) => commitBody);

        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "skip",
          scope: "workspace",
          reason: "Found commit message: [khulnasoft skip test-workspace]",
        });
        expect(mockExecSync).toHaveBeenCalledWith("git show -s --format=%B");
        mockExecSync.mockRestore();
      });

      it("results in deploy when deploy only is found", () => {
        const commitBody = "deploying [khulnasoft only test-workspace]";
        const mockExecSync = jest
          .spyOn(child_process, "execSync")
          .mockImplementation((_) => commitBody);

        expect(checkCommit({ workspace: "test-workspace" })).toEqual({
          result: "deploy",
          scope: "workspace",
          reason: "Found commit message: [khulnasoft only test-workspace]",
        });
        expect(mockExecSync).toHaveBeenCalledWith("git show -s --format=%B");
        mockExecSync.mockRestore();
      });

      it("results in skip when deploy not match workspace", () => {
        const commitBody = "deploying [khulnasoft only test-workspace]";
        const mockExecSync = jest
          .spyOn(child_process, "execSync")
          .mockImplementation((_) => commitBody);

        expect(checkCommit({ workspace: "test-workspace2" })).toEqual({
          result: "skip",
          scope: "workspace",
          reason: "Found commit message: [khulnasoft only test-workspace]",
        });
        expect(mockExecSync).toHaveBeenCalledWith("git show -s --format=%B");
        mockExecSync.mockRestore();
      });
    });
  });
});
