const { GuildChannel } = require('discord.js');

// const topics = require('../embeds/reactionroles/topics.json');
// const games = require('../embeds/reactionroles/games.json');

const post = (channel, embedObj) => {
	console.dir([embedObj]);
	console.dir('---------------------------');
	channel.send({ embeds: [embedObj] });
};


module.exports = {
	post,
};