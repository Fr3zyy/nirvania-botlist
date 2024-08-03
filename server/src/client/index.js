const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const { readdirSync } = require('node:fs');
const path = require('path');
const config = require('@/src/config/settings');

class DiscordBot {
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
      ],
      shards: 'auto',
    });

    this.config = config;
    global.client = this;
  }

  async initialize() {
    await this.loadUtils();
    this.setUpEventListeners();
    return this;
  }

  async loadUtils() {
    const utilsPath = path.join(__dirname, 'utils');
    const utilFiles = readdirSync(utilsPath);

    for (const file of utilFiles) {
      try {
        const util = require(path.join(utilsPath, file));
        await util.execute(this.client);
        logger.info(`Loaded utility: ${file}`);
      } catch (error) {
        logger.error(`Error loading utility ${file}:`, error);
      }
    }
  }

  setUpEventListeners() {
    this.client.once('ready', () => {
      logger.info(`Logged in as ${this.client.user.tag}`);
    });

    this.client.on('error', error => {
      logger.error('Discord client error:', error);
    });
  }

  async start() {
    try {
      await this.client.login(this.config.bot.token);
      logger.info('Bot has successfully logged in and started.');
    } catch (error) {
      logger.error('Failed to log in:', error);
      throw error;
    }
  }
  async logToDiscord(channelId, message, options = {}) {
    try {
      const guild = this.client.guilds.cache.get(this.config.server.id);
      if (!guild) {
        logger.error(`Guild with ID ${this.config.server.id} not found.`);
        return;
      }

      const channel = guild.channels.cache.get(channelId);
      if (!channel) {
        logger.error(`Channel with ID ${channelId} not found.`);
        return;
      }

      const embed = new EmbedBuilder()
        .setDescription(message)
        .setColor(options.color || '#0099ff')
        .setTimestamp();

      if (options.title) embed.setTitle(options.title);
      if (options.footer) embed.setFooter({ text: options.footer });

      await channel.send({ embeds: [embed] });
    } catch (error) {
      logger.error('Log gönderirken hata oluştu:', error);
    }
  }
}

async function createBot() {
  const bot = new DiscordBot();
  await bot.initialize();
  return bot;
}

module.exports = createBot;