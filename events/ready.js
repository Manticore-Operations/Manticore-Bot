const { Logger } = require('../services/logger');
const logger = new Logger();

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		logger.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
