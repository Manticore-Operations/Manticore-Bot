const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Client, Message, Cha, Interaction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reactionroles')
		.setDescription('Reaction roles'),
	async execute(interaction, client) {

		const TarkovRole = interaction.guild.roles.cache.find(role => role.name === 'Tarkov');
		const HoiRole = interaction.guild.roles.cache.find(role => role.name === 'HOI');

		// TODO: change into a dictionary?
		const Tarkov = '🌟';
		const Hoi = '🌱';

		const channelID = interaction.channelId;
		const channel = interaction.channel;
		console.log(`Reaction roles triggered in channel ${interaction.channel.name} by ${interaction.user.tag}`);

		// MESSAGE EMBED
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Get your roles here!')
			.setDescription(`
				Click the reactions to get your roles!\n\n
				${Tarkov} Tarkov\n
				${Hoi} HOI
			`);

		const mes = await channel.send({ embeds: [embed] });
		mes.react(Tarkov);
		mes.react(Hoi);

		// Messy, optimise later
		client.on('messageReactionAdd', async (reaction, user) => {
			if (user.bot || !reaction.message.guild) return;
			if (reaction.message.partial) await reaction.message.fetch();
			if (reaction.partial) await reaction.fetch();

			console.log('test');
			if (reaction.message.channel.id == channel) {
				switch (reaction.emoji.name) {
				case Tarkov:
					if (reaction.me) {
						await reaction.message.guild.members.cache.get(user.id).roles.add(TarkovRole);
					}
					else {
						await reaction.message.guild.members.cache.get(user.id).roles.remove(TarkovRole);
					}
					console.log('Tarkov');
					break;
				case Hoi:
					await reaction.message.guild.members.cache.get(user.id).roles.add(HoiRole);
					console.log('Hoi');
					break;
				}
			}
		});
		await interaction.reply({ content: 'Reaction role embed created!', ephemeral: true });
	},
};
