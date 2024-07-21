<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Uma estrutura <a href="http://nodejs.org" target="_blank">Node.js</a> progessiva para a criação de aplicativos eficientes e escaláveis do lado do servidor.</p>
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

Este rico projeto contém as operações básicas de gerenciamento de usuários e foi feito para demonstrar o resultado dos meus esforços em estudar o [Node.js](https://nodejs.org/pt) para aplicações em servidores Web e seu poderoso ecossistema criado por Ryan Dahl em 2009, o fantástico framework [Nest](https://nestjs.com/) criado por Kamil Mysliwiec em 2017, e a perfeita [Clean Code Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) criada pelo ilustre Robert C. Martin (Uncle Bob) em 2012. <br> O projeto adota práticas modernas de desenvolvimento, incluindo Test-Driven Development (TDD) com Jest para garantir a qualidade e robustez do código nos testes unitários, Domain-Driven Design (DDD) para estruturar o sistema em torno de seu domínio e regras de negócios, promovendo um design mais claro e escalável, o padrão Repository para isolar a lógica de acesso a dados e facilitar a manutenção e testes do código, Inversão de Controle (IoC) e Injeção de Dependências (DI) para melhorar a flexibilidade e a modularidade do sistema.

## About Me

[Drive/Curriculum Renato de Queiroz Marcondes](https://docs.google.com/document/d/1rUnLT-Te6wn__Im3jdWAgRZ9OyNX5NvgASNTYW3Z0a0/edit?usp=sharing)

[Linkedin](https://www.linkedin.com/in/dequeirozmarcondes/)


## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
## Endpoints para Testes da API

Aqui estão os endpoints disponíveis para testes na API de gerenciamento de usuários:

- **Criar Usuário**
  - **Método:** `POST`
  - **URL:** `/users`
  - **Corpo:** `CreateUserDto`
  - **Descrição:** Cria um novo usuário.

- **Listar Todos os Usuários**
  - **Método:** `GET`
  - **URL:** `/users`
  - **Descrição:** Recupera todos os usuários.

- **Buscar Usuário por ID**
  - **Método:** `GET`
  - **URL:** `/users/:id`
  - **Parâmetro:** `id` (string)
  - **Descrição:** Recupera um usuário específico pelo ID.

- **Atualizar Usuário**
  - **Método:** `PATCH`
  - **URL:** `/users/:id`
  - **Parâmetro:** `id` (string)
  - **Corpo:** `UpdateUserDto`
  - **Descrição:** Atualiza as informações de um usuário existente.

- **Excluir Usuário**
  - **Método:** `DELETE`
  - **URL:** `/users/:id`
  - **Parâmetro:** `id` (string)
  - **Descrição:** Remove um usuário específico pelo ID.


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
