# Introduction

This is a sample RESTful API with Express (Node.js) and mongoDb. 

Always use environment variables for configurations, for connectionstring you need to create a cluster in mongo cloud and add to the configuration.

For a simple version of this project please check:

https://github.com/erasmosoares/sample-node-express


# Usage

Clone this repo and install the packages: 

```
npm i
```
Use nodemon to run the server:
> nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

In your terminal console execute:

```
nodemon index.js
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


