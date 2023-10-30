const { GuildChannel } = require('discord.js');

// const topics = require('../embeds/reactionroles/topics.json');
// const games = require('../embeds/reactionroles/games.json');

const post = (channel, embedObj) => {
	channel.send({ embeds: [embedObj] });
};


module.exports = {
	post,
};