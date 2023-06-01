# App Image
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

# Service Image
FROM build

COPY . .

ARG APP_NAME

ENV SERVICE_NAME=${APP_NAME}

CMD npm run start ${SERVICE_NAME}
