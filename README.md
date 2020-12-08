![Polycade.com](https://i.imgur.com/jcvsFKh.png)

---

# Polycade Engineering Node.js REST API Challenge

This repo is to demonstrate Node server supporting various API routes mentioned in https://github.com/polycade/challenge-rest-api. The project has used npm as package manager, [koa](https://www.npmjs.com/package/koa) as HTTP middleware, postgres as a database and [Knex](https://www.npmjs.com/package/knex) as a database and query builder. Please go through the following instruction to setup the project

## Instructions

How to attempt this challenge:

1) Run this command to clone repo `git clone https://github.com/hdkhardikB/polycate-rest-api-challenge`
2) Create a database with name `polycade`
3) Run `npm install`
4) Create `.env` file with all mentioned variables in `.env.example`
5) Use database values for respective environment variables
6) Run command `npm run setup-db` to run migrations script for creating tables and seeding database.
8) To run the node server plese use `npm run start` command
9) To run the node server in watch mode please run `npm run watch`
10) To run unit test please run `npm run test`
11) To run unit test in watch mode, use command `npm run watch-test`
