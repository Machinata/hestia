# Hestia

Hestia is an early stage project

- [Setup](#setup)
- [Developing](#developing)
    - [Modifying Database Schema](#modifying-database-schema)
- [Building](#building)
- [Stack](#stack)

## Setup

```bash
# install dependencies
bun install

# set up local database
bun prisma:dev
```

## Developing

Once you've created a project and installed dependencies, start a development server:

```bash
bun dev

# or start the server and open the app in a new browser tab
bun dev -- --open

# to use storybook for components development
bun storybook

# interact with local database
bun prisma:studio
```

> You can access the Yoga web-app at `/api/graphql`

### Modifying Database Schema

> This section is still a work in progress

We are using Prisma as our DB ORM tool.

- Please follow the [naming conventions](https://www.prisma.io/docs/orm/reference/prisma-schema-reference#naming-conventions) layed out by Prisma when creating tables.

## Building

To create a production version of your app:

```bash
bun build
```

## Stack

- https://svelte.dev/docs/kit/introduction
- https://zod.dev/
- https://day.js.org/
- https://inlang.com/c/svelte

### Frontend

- https://tailwindcss.com/
- https://www.flaticon.com/
- https://daisyui.com/

### Backend

- https://www.prisma.io/
- https://pothos-graphql.dev/
- https://the-guild.dev/graphql/yoga-server
- https://github.com/pinojs/pino

### Tools

- https://storybook.js.org/
- https://vite.dev/
- https://vitest.dev/

You can preview the production build with `bun run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
