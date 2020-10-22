# Introduction

This is a sample RESTful API with Express (Node.js). You can use it as a starting point for creating apis using Node.


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
> In production make sure to install SSL support to use HTTPS


