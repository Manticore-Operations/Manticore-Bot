const { EmbedBuilder } = require('discord.js');

async function createReactionroleMessage(channel) {

	// TODO: change into a dictionary?
	const Tarkov = '🌟';
	const Hoi = '🌱';

	const embed = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle('Get your roles here!')
		.setDescription(`
            Click the reactions to get your roles!\n\n
            ${Tarkov} Tarkov\n
            ${Hoi} HOI
        `);

	let message = '';
	try {
		message = await channel.send({ embeds: [embed] });
		message.react(Tarkov);
		message.react(Hoi);
	}
	catch {
		console.error('createReactionroleMessage: COULD NOT SEND MESSAGE');
		return 1;
	}
	return message.id;
}

module.exports = { createReactionroleMessage };