const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const dp = require('./deployCommands');
const { token } = require('./config');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

dp.deployCommands();

// Has to be at the bottom of the file
client.login(token);
