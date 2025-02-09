import { setupTestFixtures } from "@nrz/test-utils";
import { describe, it, expect } from "@jest/globals";
import { transformer } from "../src/transforms/add-package-names";

describe("add-package-names", () => {
  const { useFixture } = setupTestFixtures({
    directory: __dirname,
    test: "add-package-names",
  });

  it("missing names", async () => {
    // load the fixture for the test
    const { root, readJson } = useFixture({
      fixture: "missing-names",
    });

    // run the transformer
    const result = await transformer({
      root,
      options: { force: false, dryRun: false, print: false },
    });

    // result should be correct
    expect(result.fatalError).toBeUndefined();
    expect(result.changes).toMatchInlineSnapshot(`
      {
        "packages/ui/package.json": {
          "action": "modified",
          "additions": 1,
          "deletions": 0,
        },
        "packages/utils/package.json": {
          "action": "modified",
          "additions": 1,
          "deletions": 0,
        },
      }
    `);

    // validate unique names
    const names = new Set();

    for (const pkg of ["ui", "utils"]) {
      const pkgJson = readJson<{ name: string }>(
        `packages/${pkg}/package.json`
      );
      expect(pkgJson?.name).toBeDefined();
      expect(names.has(pkgJson?.name)).toBe(false);
      names.add(pkgJson?.name);
    }
  });

  it("duplicate names", async () => {
    // load the fixture for the test
    const { root, readJson } = useFixture({
      fixture: "duplicate-names",
    });

    // run the transformer
    const result = await transformer({
      root,
      options: { force: false, dryRun: false, print: false },
    });

    // result should be correct
    expect(result.fatalError).toBeUndefined();
    expect(result.changes).toMatchInlineSnapshot(`
      {
        "packages/utils/package.json": {
          "action": "modified",
          "additions": 1,
          "deletions": 1,
        },
      }
    `);

    // validate unique names
    const names = new Set();

    for (const pkg of ["ui", "utils"]) {
      const pkgJson = readJson<{ name: string }>(
        `packages/${pkg}/package.json`
      );
      expect(pkgJson?.name).toBeDefined();
      expect(names.has(pkgJson?.name)).toBe(false);
      names.add(pkgJson?.name);
    }
  });

  it("correct names", async () => {
    // load the fixture for the test
    const { root, readJson } = useFixture({
      fixture: "correct-names",
    });

    // run the transformer
    const result = await transformer({
      root,
      options: { force: false, dryRun: false, print: false },
    });

    // result should be correct
    expect(result.fatalError).toBeUndefined();
    expect(result.changes).toMatchInlineSnapshot(`{}`);

    // validate unique names
    const names = new Set();

    for (const pkg of ["ui", "utils"]) {
      const pkgJson = readJson<{ name: string }>(
        `packages/${pkg}/package.json`
      );
      expect(pkgJson?.name).toBeDefined();
      expect(names.has(pkgJson?.name)).toBe(false);
      names.add(pkgJson?.name);
    }
  });

  it("ignored packages", async () => {
    // load the fixture for the test
    const { root, readJson } = useFixture({
      fixture: "ignored-packages",
    });

    // run the transformer
    const result = await transformer({
      root,
      options: { force: false, dryRun: false, print: false },
    });

    // result should be correct
    expect(result.fatalError).toBeUndefined();
    expect(result.changes).toMatchInlineSnapshot(`{}`);

    // validate unique names
    const names = new Set();

    const pkg = "utils";
    const pkgJson = readJson<{ name: string }>(`packages/${pkg}/package.json`);
    expect(pkgJson?.name).toBeDefined();
    expect(names.has(pkgJson?.name)).toBe(false);
    names.add(pkgJson?.name);

    const unchangedPkg = "ui";
    const unchangedPkgJson = readJson<{ name: string }>(
      `packages/${unchangedPkg}/package.json`
    );
    expect(unchangedPkgJson?.name).toBeUndefined();
  });
});
