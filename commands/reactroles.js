// CURRENTLY BROKEN

const { SlashCommandBuilder } = require('discord.js');
const { createReactionroleMessage } = require('../functions/reactionroles/createReactionroleMessage');
/*
GuildMember
GuildMemberRoleManager
*/
module.exports = {
	data: new SlashCommandBuilder()
		.setName('reactionroles')
		.setDescription('Reaction roles'),
	async execute(interaction, client) {
		console.log(`Reaction roles triggered in channel ${interaction.channel.name} by ${interaction.user.tag}`);

		const channel = interaction.channel.id;
		const messageID = createReactionroleMessage(interaction.channel);

		const dict = {
			'🌟': 'Tarkov',
			'🌱': 'HOI',
		};

		// Messy, optimise later
		client.on('messageReactionAdd', async (reaction, user) => {
			if (user.bot || !reaction.message.guild) return;
			if (reaction.message.partial) await reaction.message.fetch();
			if (reaction.partial) await reaction.fetch();

			if (reaction.message.channel.id == channel && reaction.emoji.name in dict) {
				const r = interaction.guild.roles.cache.find(role => role.name === dict[reaction.emoji.name]);
				const gMember = reaction.message.guild.members.cache.get(user.id);

				console.log(`${gMember.roles.cache.has(r.id)}`);
				if (gMember.roles.cache.has(r.id)) {
					await reaction.message.guild.members.cache.get(user.id).roles.remove(r);
				}
				else {
					await reaction.message.guild.members.cache.get(user.id).roles.add(r);
				}
				reaction.users.remove(user);
			}
		});
		await interaction.reply({ content: 'Reaction role embed created!', ephemeral: true });
	},
};
