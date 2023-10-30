const { SlashCommandBuilder } = require('discord.js');
const embed = require('../helpers/embed');
const games = require('../embeds/reactionroles/games.json');
const topics = require('../embeds/reactionroles/topics.json');
const { Logger } = require('../services/logger');
const logger = new Logger();

const EMBEDS = {
	'games': games,
	'topics': topics,
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('postembed')
		.setDescription('Reaction roles')
		.addStringOption(option =>
			option.setName('type')
				.setDescription('The type of embed to post')
				.setRequired(true)
				.addChoices(
					{ name: 'Topics', value: 'topics' },
					{ name: 'Games', value: 'games' },
				)),
	async execute(interaction, client) {
		console.log(`Reaction roles triggered in channel ${interaction.channel.name} by ${interaction.user.tag}`);
		const type = interaction.options.getString('type');
		console.dir(interaction.options);

		const embedType = EMBEDS[type] || null;
		if (!embedType) {
			logger.log('postEmbed', 'given embed type wasn\'t found');
		}

		const channel = client.channels.cache.get(interaction.channel.id);
		embed.post(channel, embedType);
		await interaction.reply({ content: 'Reaction role embed created!', ephemeral: true });
	},
};
