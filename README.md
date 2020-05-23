# MERN JWT Template

![JWT](http://jwt.io/img/badge-compatible.svg)

A basic [JWT](https://jwt.io/) authentication boilerplate, using [MongoDB](https://www.mongodb.com/), [Express Sessions](https://github.com/expressjs/session) and [TypeScript](https://www.typescriptlang.org/), along with [React](https://reactjs.org) as the main front-end library.

## Usage

First, clone the repo:

```sh
$ git clone https://github.com/hollandsgabe/mern-jwt-template.git # Or fork the project
$ cd mern-jwt-template
```

Install all the server dependencies with `yarn`:

```sh
$ yarn install
```

Don't forget to install client dependencies too:

```sh
$ cd client && yarn install
```

Then, rename `.env.example` to `.env` and place your MongoDB connection string, JWT secret and session secreto into the file.

Finally, run the project using the `dev` script in the project's root directory:

```sh
$ yarn run dev
```

Happy hacking! 🎉️
