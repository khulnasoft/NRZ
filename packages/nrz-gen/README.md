# `@nrz/gen`

Types for working with [Nrz Generators](https://nrz.build/repo/docs/core-concepts/monorepos/code-generation).

## Usage

Install:

```bash
pnpm add @nrz/gen --save-dev
```

Use types within your generator `config.ts`:

```ts filename="nrz/generators/config.ts"
import type { PlopTypes } from "@nrz/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // create a generator
  plop.setGenerator("Generator name", {
    description: "Generator description",
    // gather information from the user
    prompts: [
      ...
    ],
    // perform actions based on the prompts
    actions: [
      ...
    ],
  });
}
```

Learn more about Nrz Generators in the [docs](https://nrz.build/repo/docs/core-concepts/monorepos/code-generation)

---

For more information about Nrz, visit [nrz.build](https://nrz.build) and follow us on X ([@nrz](https://x.com/nrz))!
