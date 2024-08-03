const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const { router } = require('express-file-routing');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const config = require('./config/settings');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
  }

  async initialize() {
    await this.connectDB();
    this.setupMiddlewares();
    this.setupSessions();
    this.setupPassport();
    await this.setupRoutes();
    return this;
  }

  async connectDB() {
    try {
      await mongoose.connect(config.database.url);
      logger.info('MongoDB Connected');
    } catch (err) {
      logger.error(`MongoDB connection error: ${err}`);
      throw err;
    }
  }

  setupMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(require('@/src/utils/middlewares/error.js'));
  }

  setupSessions() {
    const sessionStore = this.createMongoStore();
    this.app.use(session({
      secret: "guclubirsecretbuda:D",
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
    }));
  }

  createMongoStore() {
    try {
      const store = MongoStore.create({
        mongoUrl: config.database.url,
        touchAfter: 24 * 3600,
        crypto: {
          secret: "guclubirsecret"
        }
      });

      store.on('error', (error) => {
        logger.error('MongoStore error:', error);
      });

      logger.info('MongoStore configured successfully');
      return store;
    } catch (error) {
      logger.error('Failed to configure MongoStore:', error);
      throw error;
    }
  }

  setupPassport() {
    require('@/src/config/passport-setup');
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(this.ensureUserInRequest);
  }

  ensureUserInRequest(req, res, next) {
    if (!req.user && req.session?.passport?.user) {
      req.user = req.session.passport.user;
    }
    next();
  }

  async setupRoutes() {
    const routesDirectory = path.join(__dirname, 'routes');
    this.app.use('/', await router({ directory: routesDirectory }));
    this.app.use('*', this.notFoundHandler);
  }

  notFoundHandler(req, res) {
    res.sendError('Not Found', 404);
  }

  start() {
    this.app.listen(this.port, () => {
      logger.info(`Server running on port ${this.port}`);
    });
  }
}

module.exports = async () => {
  const server = new Server();
  await server.initialize();
  return server;
};