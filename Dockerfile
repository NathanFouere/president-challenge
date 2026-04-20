#https://pnpm.io/docker#example-2-build-multiple-docker-images-in-a-monorepo

FROM node:20.16.0-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@10.4.1

FROM base AS build
ARG NUXT_UI_PRO_LICENSE
ENV NUXT_UI_PRO_LICENSE=${NUXT_UI_PRO_LICENSE}

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --filter=@president-challenge/shared --frozen-lockfile
RUN pnpm run build:shared
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build:backend
RUN pnpm deploy --filter=@president-challenge/server --prod /prod/server

FROM base AS server
WORKDIR /prod/server
COPY --from=build /prod/server /prod/server
EXPOSE 3333
CMD [ "pnpm", "startup-start" ]
