const {readdirSync} = require('node:fs');

module.exports = {
	async execute(client) {
		const eventFiles = readdirSync('./src/client/events');

		Promise.all(eventFiles.map(async file => {
			const event = await require(`../events/${file}`);

			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args));
			} else {
				client.on(event.name, (...args) => event.execute(...args));
			}
		}));

		// Process Listeners
		process.on('unhandledRejection', e => {
			logger.log(e);
		});
		process.on('uncaughtException', e => {
			logger.log(e);
		});
		process.on('uncaughtExceptionMonitor', e => {
			logger.log(e);
		});
	},
};
