# Supnex Test

This is for the requested exam of the supnex group.

| \*  | Micro     | Type             | Port | Command                         |
| --- | --------- | ---------------- | ---- | ------------------------------- |
| 1   | gateway   | RESTful, GraphQL | 3010 | npm run start gateway           |
| 2   | materials | gRPC             | 5050 | npm run start service:materials |
| 3   | suppliers | gRPC             | 5051 | npm run start service:suppliers |
| 4   | products  | gRPC             | 5052 | npm run start service:products  |
| 5   | stocks    | Kafka            | 3053 | npm run start service:stocks    |

## Quick Start Guide

Install prerequisites by the following commands.

```sh
npm ci # install project dependencies, node v18.15.0

docker-compose -f docker-compose.util.yaml up -d # mongo and redis
docker-compose -f docker-compose.brk.yaml up -d # kafka broker and ui
```

Mock database and run tests.

```sh
npm run db:mock # mock database by example data

npm run test # start unit tests, e2e written but not work
```
