<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


# Notes

### Generate Controler

```properties
$ nest genrate controller produts
$ nest g co produts
```

# Graphql

GraphQL is a powerful query language for APIs and a runtime for fulfilling those queries with your existing data. It's an elegant approach that solves many problems typically found with REST APIs. For background, we suggest reading this comparison between GraphQL and REST. GraphQL combined with TypeScript helps you develop better type safety with your GraphQL queries, giving you end-to-end typing.

### Installation

If you are using express HTTP engine, install the following packages:

```
$ npm i --save @nestjs/graphql apollo-server-express graphql
```

In case of fastify, you should install apollo-server-fastify instead.

```
$ npm i --save @nestjs/graphql apollo-server-fastify graphql
```

### Setup GraphQL

To start a GraphQL API install the following packages into your Nest application.

```
$ npm i --save @nestjs/graphql graphql-tools graphql
```

### GraphQL Code First Approach

A GraphQL schema contains many `types` and `Queries`. The schema grows in size and complexity for each new query, mutation and type. GraphQL `Code First` enables us to automatically generate a GraphQL schema using TypeScript and decorators. This helps us focus on writing .ts files and we don't need to write the GraphQL schema ourselves.

`@nestjs/graphql` provides all decorators to generate our schema. Here are a few decorators and there usage:

- `@ObjectType()` generate class as `Type`
- `@Field()` generate a class property as a `Field`
- `@InputType()` generate class as `Input`
- `@Args generate` method params as `Arguments`
- `@Query()` generate method as `Query`
- `@Mutation()` generate method as `Mutation`
- `@ResolveField` resolve relationship property


# Test
```properties
<!-- Create -->
$ curl -X POST -H "Content-Type: application/json" -d '{"title": "hello", "price": 200}' localhost:3000/products

<!-- Get -->
$ curl localhost:3000/products | jq
$ curl localhost:4000/products/5fc145e5ec5c501dc050d055 | jq

<!-- Update -->
$ curl -X PUT -H "Content-Type: application/json" -d '{"title": "hello world"}' localhost:3000/products/5fc145e5ec5c501dc050d055

<!-- Delete -->
$ curl -X DELETE  localhost:4000/products/5fc145e5ec5c501dc050d055
```

<!-- Reference -->
[GraphQL Code-First Approach with NestJS 7]: https://notiz.dev/blog/graphql-code-first-with-nestjs-7#graphql-type