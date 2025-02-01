# Nrz starter

This is an official starter Nrz.

## Using this example

Run the following command:

```sh
npx create-nrz@latest
```

## What's inside?

This Nrz includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Nrz has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-nrz
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-nrz
pnpm dev
```

### Remote Caching

Nrz can use a technique known as [Remote Caching](https://nrz.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Nrz will cache locally. To enable Remote Caching you will need an account with Khulnasoft. If you don't have an account you can [create one](https://khulnasoft.com/signup), then enter the following commands:

```
cd my-nrz
npx nrz login
```

This will authenticate the Nrz CLI with your [Khulnasoft account](https://khulnasoft.com/docs/concepts/personal-accounts/overview).

Next, you can link your Nrz to your Remote Cache by running the following command from the root of your Nrz:

```
npx nrz link
```

## Useful Links

Learn more about the power of Nrz:

- [Tasks](https://nrz.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://nrz.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://nrz.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://nrz.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://nrz.build/repo/docs/reference/configuration)
- [CLI Usage](https://nrz.build/repo/docs/reference/command-line-reference)
