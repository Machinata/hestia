# Hestia

Hestia is an early stage project

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