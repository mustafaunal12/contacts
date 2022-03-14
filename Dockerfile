FROM node:14-alpine AS builder
ARG NPM_TOKEN
ENV NODE_ENV build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
RUN npm run build

FROM node:14-alpine
WORKDIR /app
RUN apk --no-cache add shadow
RUN groupmod -g 500 node && usermod -u 500 node
COPY --from=builder --chown=node:node /app/dist /app/dist
COPY --chown=node:node package.json /app/package.json
COPY .env /app/dist/.env
RUN npm install --only=production
USER node
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start" ]
