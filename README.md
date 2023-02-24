# Introduction

This is a sample RESTful API with Express (Node.js) and mongoDb.

Always use environment variables for configurations, for connectionstring you need to create a cluster in mongo cloud and add to the configuration.

For a simple version of this project please check:

https://github.com/erasmosoares/sample-node-express

# Usage

**For docker usage please jump to the docker section.**

Clone this repo and install the packages:

```console
npm i
```

This app uses two databases, one for the application itself and other for log purpose, please take a moment to create this two mongo dbs on your mongoDb cluster.

Configure the environement variables runnig this on your terminal:

```console
$env:_jwtPrivateKey=<your private key>
$env:_connectionString=<your mongodb application connection string>
$env:_connectionStringLog=<your mongodb application logs connection string>
```

Use nodemon to run the server:

> nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

In your terminal console execute:

```console
nodemon index.js
```

# Testing the APIs

To test the APIs you need to create an account and copy the JWT token that is generated to add into the x-auth-token header, here is an exemple:

http **POST**:
http://localhost:3000/api/auth

```json
{
  "email": "erasmo@email.com",
  "password": "a123456789"
}
```

This will produce a response with the JSON web token like this:

```console
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk1Y2MyZDUyNTk4NDc0NGM2NTYzYjciLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NzcxNjcwOTcsImV4cCI6MTY3NzE3MDY5N30.BdTK1GvqM_29faFcDkdbMnpDwz1uFUtHTMoV-5OGR0s
```

Now you can make any POST calls by pasting this token into the x-auth-token header, below you can find some examples:

http **GET**: Books
http://localhost:3000/api/books

```json
[
  {
    "_id": "6178b4a56dd39a1aecf06e33",
    "name": "Dead Zone 2",
    "__v": 0
  }
]
```

http **GET**: Users (Need Token)
http://localhost:3000/api/users

```json
[
  {
    "_id": "5f95cc2d525984744c6563b7",
    "name": "Erasmo",
    "email": "erasmo@email.com",
    "password": "$2b$10$vgxLChiqX5H5aPTXywNysOLo/.3tklj7ZuWqoD3XErnJF7nsH24CS",
    "__v": 0,
    "isAdmin": true
  }
]
```

http **POST**: Books (Need Token)
http://localhost:3000/api/books

Body:

```json
{
  "name": "Dead Zone 5"
}
```

Response:

```json
{
  "_id": "63f78d00916b192704e506d9",
  "name": "Dead Zone 5",
  "__v": 0
}
```

There are more apis available, please check the available routes.

# Integration and Unit Tests

The tests were created using Jest, to run them just use the command below:

```
npm test
```

# Docker

Before run docker, add the environment variables to the DockerFile after the command "run npm install":

```docker
FROM node:18.14.2-alpine3.17
WORKDIR /app
COPY . .
RUN npm install

ENV _jwtPrivateKey=<your private key>
ENV _connectionString=<your mongodb application connection string>
ENV _connectionStringLog=<your mongodb application logs connection string>
```

To install the image run the following command in the project root:

```
docker build -t sample-node-app .
```

Next start the container:

```
docker run sample-node-app
```

Additional Info: To navigate into the image shell

```
docker run -it sample-node-app sh
```

# Packages Installed

## Nodemon

Automatically restart the node app after changes

https://github.com/remy/nodemon

```
npm i -g nodemon
```

## Joi

The most powerful schema description language and data validator for JavaScript.

https://github.com/sideway/joi#readme

```
npm i joi
```

## Helmet

Helmet helps you secure your Express apps by setting various HTTP headers.

https://github.com/helmetjs/helmet

```
npm i helmet
```

## Morgan

HTTP request logger middleware for node.js.

https://github.com/expressjs/morgan#readme

```
npm i morgan
```

## Cors

Cors is responsible for allowing or not asynchronous requests from other domains. If we are developing an API that will serve data for any kind of client-side applications, we need to enable the CORS’s middleware for the endpoints become public.

https://github.com/expressjs/cors#readme

```
npm i cors
```

## Pug

You can use pug to return HTML markup to the client

https://github.com/pugjs/pug

```
npm i pug
```

## Compression

Compresses the HTTP response that is sent to the client

https://github.com/expressjs/compression

```
npm i compression
```

## Joi-objectid

joi-objectid validates that the value is an alphanumeric string of 24 characters in length. Can be used to validate object ID.

https://github.com/mkg20001/joi-objectid

```
npm i joi-objectid
```

## Lodash

A modern JavaScript utility library delivering modularity, performance, & extras. This is the new version of underscore

https://github.com/lodash/lodash

```
npm i lodash
```

## joi-password-complexity

Password complexity validation for Joi

https://github.com/kamronbatman/joi-password-complexity

```
npm i joi-password-complexity
```

## bcrypt

bcrypt is a password-hashing function designed by Niels Provos and David Mazières, based on the Blowfish cipher

https://github.com/kelektiv/node.bcrypt.js

```
npm i bcrypt
```

## Jsonwebtoken

JsonWebToken implementation for node.js

https://github.com/auth0/node-jsonwebtoken#readme

```
npm i jsonwebtoken
```

## node-config

Node.js Application Configuration

https://github.com/lorenwest/node-config

```
npm i config
```

## express-async-errors

async/await support for ExpressJS

https://github.com/davidbanham/express-async-errors#readme

```
npm i express-async-errors
```

## winston

winston is designed to be a simple and universal logging library with support for multiple transports (stores).

https://github.com/winstonjs/winston#readme

```
npm i winston
```

## winston-mongodb

A MongoDB transport for winston.

https://github.com/winstonjs/winston-mongodb

```
npm i winston-mongodb
```

## Jest

Complete and ready to set-up JavaScript testing solution.

https://github.com/facebook/jest

```
npm i jest --save-dev
```

## SuperTest

uper-agent driven library for testing node.js HTTP servers using a fluent API.

https://github.com/visionmedia/supertest

```
npm i supertest  --save-dev
```

> In production make sure to install SSL support to use HTTPS
