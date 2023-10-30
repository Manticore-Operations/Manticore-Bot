const { Logger } = require('../services/logger');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		logger.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
