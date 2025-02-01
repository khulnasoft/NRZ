import { setupTestFixtures } from "@nrz/test-utils";
import { describe, it, expect } from "@jest/globals";
import { transformer } from "../src/transforms/rename-pipeline";

describe("rename-pipeline", () => {
  const { useFixture } = setupTestFixtures({
    directory: __dirname,
    test: "rename-pipeline",
  });

  it("migrates nrz.json pipeline - root config only", () => {
    // load the fixture for the test
    const { root, read } = useFixture({
      fixture: "root-only",
    });

    // run the transformer
    const result = transformer({
      root,
      options: { force: false, dryRun: false, print: false },
    });

    expect(JSON.parse(read("nrz.json") || "{}")).toStrictEqual({
      $schema: "https://nrz.build/schema.json",
      globalDependencies: ["important.txt"],
      tasks: {
        build: {
          outputs: ["dist"],
        },
      },
    });

    expect(result.fatalError).toBeUndefined();
    expect(result.changes).toMatchInlineSnapshot(`
      {
        "nrz.json": {
          "action": "modified",
          "additions": 1,
          "deletions": 1,
        },
      }
    `);
  });

  it("migrates nrz.json pipeline - workspace configs", () => {
    // load the fixture for the test
    const { root, read } = useFixture({
      fixture: "workspace-configs",
    });

    // run the transformer
    const result = transformer({
      root,
      options: { force: false, dryRun: false, print: false },
    });

    expect(JSON.parse(read("nrz.json") || "{}")).toStrictEqual({
      $schema: "https://nrz.build/schema.json",
      tasks: {
        build: {
          dependsOn: ["^build"],
          outputs: [".next/**", "!.next/cache/**"],
        },
        dev: {
          cache: false,
        },
        lint: {
          outputs: [],
        },
        test: {
          outputs: [],
        },
      },
    });

    expect(JSON.parse(read("apps/web/nrz.json") || "{}")).toStrictEqual({
      $schema: "https://nrz.build/schema.json",
      extends: ["//"],
      tasks: {
        build: {
          dependsOn: [],
        },
      },
    });

    expect(JSON.parse(read("packages/ui/nrz.json") || "{}")).toStrictEqual({
      $schema: "https://nrz.build/schema.json",
      extends: ["//"],
      tasks: {
        test: {
          dependsOn: ["build"],
        },
      },
    });

    expect(result.fatalError).toBeUndefined();
    expect(result.changes).toMatchInlineSnapshot(`
      {
        "apps/docs/nrz.json": {
          "action": "modified",
          "additions": 1,
          "deletions": 1,
        },
        "apps/web/nrz.json": {
          "action": "modified",
          "additions": 1,
          "deletions": 1,
        },
        "packages/ui/nrz.json": {
          "action": "modified",
          "additions": 1,
          "deletions": 1,
        },
        "nrz.json": {
          "action": "modified",
          "additions": 1,
          "deletions": 1,
        },
      }
    `);
  });

  it("errors if no nrz.json can be found", () => {
    // load the fixture for the test
    const { root, read } = useFixture({
      fixture: "no-nrz-json",
    });

    expect(read("nrz.json")).toBeUndefined();

    // run the transformer
    const result = transformer({
      root,
      options: { force: false, dryRun: false, print: false },
    });

    expect(read("nrz.json")).toBeUndefined();
    expect(result.fatalError).toBeDefined();
    expect(result.fatalError?.message).toMatch(
      /No nrz\.json found at .*?\. Is the path correct\?/
    );
  });

  it("does not do anything if there is already a top level tasks key", () => {
    // load the fixture for the test
    const { root, read } = useFixture({
      fixture: "with-tasks",
    });

    // run the transformer
    const result = transformer({
      root,
      options: { force: false, dryRun: false, print: false },
    });

    expect(JSON.parse(read("nrz.json") || "{}")).toStrictEqual({
      $schema: "https://nrz.build/schema.json",
      tasks: {
        build: {
          outputs: ["dist"],
        },
      },
    });
    expect(result.fatalError).toBeUndefined();
    expect(result.changes).toStrictEqual({});
  });
});
