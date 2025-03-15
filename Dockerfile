#https://pnpm.io/docker#example-2-build-multiple-docker-images-in-a-monorepo

FROM node:20.16.0-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@9.12.2

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --filter=@president-challenge/shared --frozen-lockfile
RUN pnpm run build:shared
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build:backend
RUN pnpm run build:client
RUN pnpm deploy --filter=@president-challenge/server --prod /prod/server
RUN pnpm deploy --filter=@president-challenge/client --prod /prod/client

FROM base AS server
COPY --from=build /prod/server /prod/server
WORKDIR /prod/server
EXPOSE 3333
CMD [ "pnpm", "startup-start" ]

FROM base AS client
COPY --from=build /prod/client /prod/client
WORKDIR /prod/client
EXPOSE 3000
CMD [ "pnpm", "start" ]