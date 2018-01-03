FROM node:8 AS build-env
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /build

COPY . ./

RUN npm install
RUN npm run build

FROM node:8 AS dependency-env
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /build

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --production
RUN npm prune

FROM node:8-alpine
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY --from=build-env /build/dist ./dist
COPY --from=dependency-env /build/node_modules ./node_modules

EXPOSE 80
CMD ["npm", "start"]
