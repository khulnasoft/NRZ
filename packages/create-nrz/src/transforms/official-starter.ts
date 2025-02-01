import path from "node:path";
import fs from "fs-extra";
import type { PackageJson } from "@nrz/utils";
import { isDefaultExample } from "../utils/isDefaultExample";
import type { TransformInput, TransformResult, MetaJson } from "./types";
import { TransformError } from "./errors";

const REPO_NAMES = ["nrz", "nrz"];

const meta = {
  name: "official-starter",
};

/**
 * Transform applied to "official starter" examples (those hosted within khulnasoft/nrz/examples)
 **/

// eslint-disable-next-line @typescript-eslint/require-await -- must match transform function signature
export async function transform(args: TransformInput): TransformResult {
  const { prompts, example, opts } = args;

  const defaultExample = isDefaultExample(example.name);
  const isOfficialStarter =
    !example.repo ||
    (example.repo.username === "khulnasoft" &&
      REPO_NAMES.includes(example.repo.name));

  if (!isOfficialStarter) {
    return { result: "not-applicable", ...meta };
  }

  // paths
  const rootPackageJsonPath = path.join(prompts.root, "package.json");
  const rootMetaJsonPath = path.join(prompts.root, "meta.json");
  const hasPackageJson = fs.existsSync(rootPackageJsonPath);

  let metaJson: MetaJson | undefined;

  // 1. remove meta file (used for generating the examples page on nrz.build)
  try {
    metaJson = fs.readJsonSync(rootMetaJsonPath) as MetaJson;
    fs.rmSync(rootMetaJsonPath, { force: true });
  } catch (_err) {
    // do nothing
  }

  if (hasPackageJson) {
    let packageJsonContent: PackageJson | undefined;
    try {
      packageJsonContent = fs.readJsonSync(rootPackageJsonPath) as
        | PackageJson
        | undefined;
    } catch {
      throw new TransformError("Unable to read package.json", {
        transform: meta.name,
        fatal: false,
      });
    }

    // if using the basic example, set the name to the project name (legacy behavior)
    if (packageJsonContent) {
      if (defaultExample) {
        packageJsonContent.name = prompts.projectName;
      }

      if (packageJsonContent.devDependencies?.nrz) {
        // if the user specified a nrz version, use that
        if (opts.nrzVersion) {
          packageJsonContent.devDependencies.nrz = opts.nrzVersion;
          // use the same version as the create-nrz invocation
        } else {
          // eslint-disable-next-line @typescript-eslint/no-var-requires -- Have to go get package.json
          const version = (require("../../package.json") as { version: string })
            .version;
          packageJsonContent.devDependencies.nrz = `^${version}`;
        }
      }

      try {
        fs.writeJsonSync(rootPackageJsonPath, packageJsonContent, {
          spaces: 2,
        });
      } catch (err) {
        throw new TransformError("Unable to write package.json", {
          transform: meta.name,
          fatal: false,
        });
      }
    }
  }

  return { result: "success", metaJson, ...meta };
}
