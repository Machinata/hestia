FROM oven/bun:1.2-alpine AS build

WORKDIR /opt/build

COPY . .
RUN bun install --frozen-lockfile \
  && bun run build

FROM node:18-alpine3.21

WORKDIR /opt/app

COPY ./package.json ./package.json
COPY --from=build --chown=1000:1000 /opt/build/node_modules/ /opt/app/node_modules/
COPY --from=build --chown=1000:1000 /opt/build/build /opt/app

ENTRYPOINT [ "node", "index.js" ]