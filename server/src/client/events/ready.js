const { ActivityType, Events } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    try {
      await setPresence(client);
      await registerSlashCommands(client);
      logReadyStatus(client);
    } catch (error) {
      logger.error('Error in ClientReady event:', error);
    }
  },
};

async function setPresence(client) {
  await client.user.setPresence({
    activities: [{ name: 'Nirvania Botlist #SOON!', type: ActivityType.Listening }],
    status: 'online',
  });
  logger.info('Bot presence updated successfully');
}

async function registerSlashCommands(client) {
  const rest = new REST({ version: '10' }).setToken(client.token);
  
  try {
    logger.info('Started refreshing application (/) commands.');
    
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: client.slashDatas }
    );
    
    logger.info('Successfully reloaded application (/) commands.');
  } catch (error) {
    logger.error('Failed to reload application (/) commands:', error);
    throw error; // Rethrow to be caught in the main execute function
  }
}

function logReadyStatus(client) {
  logger.info(`${client.user.username} is now online and ready!`);
  logger.info(`Serving ${client.guilds.cache.size} guilds and ${client.users.cache.size} users`);
}