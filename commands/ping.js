const { SlashCommandBuilder } = require('discord.js');
const { Logger } = require('../services/logger');
const logger = new Logger();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		logger.log('Ping', `Command invoked by ${interaction.member.user.username} (${interaction.member.user.id})`);
		await interaction.reply({ content: 'Pong!', ephemeral: true });
	},
};
