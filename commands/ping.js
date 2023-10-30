const { SlashCommandBuilder } = require('discord.js');
const { utcNow } = require('../helpers/date');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		console.log(`${utcNow()} - Ping - Command invoked by ${interaction.member.user.username} (${interaction.member.user.id})`);
		await interaction.reply({ content: 'Pong!', ephemeral: true });
	},
};
