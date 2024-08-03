require('module-alias/register');

const Logger = require('@/src/utils/Logger');
new Logger();

const Bot = require('@/src/client');
Bot().then(bot => {
    bot.start();
}).catch(error => {
    logger.error('Failed to create bot:', error);
});

const Server = require('@/src/server.js');
Server().then(server => {
    server.start();
}).catch(error => {
    logger.error('Failed to create server:', error);
});