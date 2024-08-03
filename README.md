
# DiscordAPI-Express

Discord Authentication and Management Server

## Introduction

DiscordAPI-Express is a powerful and extensible server and bot management system built with Node.js, Express and MongoDB. It has secure Discord authentication and session management features. It can be used for robust and extensible Discord bot applications.

## Table of Contents

- [DiscordAPI-Express](#discordapi-express)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [Dependencies](#dependencies)
  - [Configuration](#configuration)
  - [Documentation](#documentation)
    - [Server Initialization](#server-initialization)
    - [User Schema](#user-schema)
    - [Error Handling Middleware](#error-handling-middleware)
  - [Examples](#examples)
    - [Logging In with Discord](#logging-in-with-discord)

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/fr3zyy/DiscordAPI-Express.git
    cd DiscordAPI-Express
    cd server
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```
## Usage

To start the server, run the following command:

```bash
npm start
```

This will initialize the server and connect to the MongoDB database. The server will be accessible at `http://localhost:3001`.

## Features

- **Discord OAuth2 Authentication**: Users can log in using their Discord accounts.
- **Session Management**: User sessions are managed with `express-session` and stored in MongoDB.
- **User Management**: User data is stored in MongoDB, including roles and subscription details.
- **Middleware Integration**: Error handling and other custom middleware are included.
- **Bot Integration**: A bot can be started and managed alongside the server.

## Dependencies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Passport](http://www.passportjs.org/)
- [passport-discord](https://github.com/nicholastay/passport-discord)
- [express-session](https://www.npmjs.com/package/express-session)
- [connect-mongo](https://www.npmjs.com/package/connect-mongo)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express-file-routing](https://www.npmjs.com/package/express-file-routing)

## Configuration

Configuration settings are stored in the `server/src/config/settings.js` file. Ensure to update this file with your specific settings, particularly for the Discord OAuth2 and MongoDB connection.

```js
module.exports = {
    bot: {
        token: "",
        prefix: ""
    },
    auth: {
        clientId: "",
        clientSecret: "",
        callbackUrl: "http://localhost:3001/auth/callback",
        scopes: ["identify"]
    },
    database: {
        url: "mongodb://localhost:27017"
    }
}
```

## Documentation

### Server Initialization

The server is initialized and started in the following sequence:

1. **Database Connection:** Connect to MongoDB using Mongoose.
2. **Middleware Setup:** Configure middleware for JSON parsing, URL encoding, and error handling.
3. **Session Setup:** Configure sessions with `express-session` and `connect-mongo`.
4. **Passport Setup:** Initialize Passport for Discord OAuth2 authentication.
5. **Route Setup:** Set up routes using `express-file-routing`.

### User Schema

The User model schema includes the following fields:

- `discordId`: Unique identifier from Discord.
- `username`: Discord username.
- `avatar`: URL to the user's avatar.
- `lastLogin`: Date of the last login.
- `isActive`: Boolean flag indicating if the user is active.

### Error Handling Middleware

Custom error handling middleware is included to manage and log errors across the application.

## Examples

Here are some examples of how to interact with the server:

### Logging In with Discord

1. Navigate to `http://localhost:3001/auth/callback`.
2. Authorize the application on Discord's OAuth2 page.
3. After successful login, you will be redirected back to the application.