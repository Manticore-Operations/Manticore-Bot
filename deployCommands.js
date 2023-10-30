const { REST, Routes } = require('discord.js');
const { TOKEN, CLIENT_ID, GUILD_ID } = require('./config.json');
const index = require('./commands/index');
const { Logger } = require('./services/logger');
const logger = new Logger();

// Construct and prepare an instance of the REST module
const createRest = () => {
	return new REST({ version: '10' }).setToken(TOKEN);
};
const validateConfig = () => {
	if (!CLIENT_ID) throw Error('Client ID not defined!');
	if (!GUILD_ID) throw Error('Guild ID not defined!');
};
const wipeCommands = async () => {
	logger.log('wipeCommands', 'START');
	validateConfig();
	const rest = createRest();

	await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
		.then(() => logger.log('wipeCommands', 'Successfully deleted all guild commands.'))
		.catch(console.error);

	await rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
		.then(() => logger.log('wipeCommands', 'Successfully deleted all application commands.'))
		.catch(console.error);

	logger.log('wipeCommands', 'commands successfully wiped');
};

const resetCommands = async () => {
	logger.log('resetCommands', 'START');
	await wipeCommands();
	deployCommands();
	logger.log('resetCommands', 'All commands successfully reset');
};

const deployCommands = async () => {
	logger.log('deployCommands', 'START');
	validateConfig();
	const rest = createRest();

	const commands = Object.values(index).map(c => c.data);

	(async () => {
		try {
			logger.log('deployCommands', `Started refreshing ${commands.length} application (/) commands.`);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
				{ body: commands },
			);

			logger.log('deployCommands', `Successfully reloaded ${data.length} application (/) commands.`);
		}
		catch (error) {
			console.error('deployCommands', 'Command deployment failed');
			console.error(error);
		}
	})();
};

module.exports = {
	deployCommands,
	wipeCommands,
	resetCommands,
};