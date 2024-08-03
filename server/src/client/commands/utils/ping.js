const { SlashCommandBuilder } = require('discord.js');

exports.commandBase = {
	prefixData: {
		name: 'ping',
		aliases: ['pong'],
	},
	slashData: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong!'),
	cooldown: 5000,
	ownerOnly: false,
	async prefixRun(client, message, args) {
		message.reply('Pong 🏓');
	},
	async slashRun(client, interaction) {
		interaction.reply('Pong 🏓');
	},
};
