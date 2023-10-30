const { REST, Routes } = require('discord.js');
const { TOKEN, CLIENT_ID, GUILD_ID } = require('./config.json');
const index = require('./commands/index');
const { utcNow } = require('./helpers/date');

// Construct and prepare an instance of the REST module
const createRest = () => {
	return new REST({ version: '10' }).setToken(TOKEN);
}
const validateConfig = () => {
	if (!CLIENT_ID) throw Error('Client ID not defined!');
	if (!GUILD_ID) throw Error('Guild ID not defined!');
}
const wipeCommands = async () => {
	console.log(`${utcNow()} - wipeCommands - START`);
	validateConfig();
	const rest = createRest();

	await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
		.then(() => console.log(`${utcNow()} - wipeCommands - Successfully deleted all guild commands.`))
		.catch(console.error);

	await rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
		.then(() => console.log(`${utcNow()} - wipeCommands - Successfully deleted all application commands.`))
		.catch(console.error);

	console.log(`${utcNow()} - wipeCommands - commands successfully wiped`);
}

const resetCommands = async () => {
	console.log(`${utcNow()} - resetCommands - START`);
	await wipeCommands();
	deployCommands();
	console.log(`${utcNow()} - resetCommands - all commands successfully reset`);
}

const deployCommands = async () => {
	console.log(`${utcNow()} - deployCommands - START`);
	validateConfig();
	const rest = createRest();

	const commands = Object.values(index).map(c => c.data);

	(async () => {
		try {
			console.log(`${utcNow()} - deployCommands - Started refreshing ${commands.length} application (/) commands.`);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
				{ body: commands },
			);

			console.log(`${utcNow()} - deployCommands - Successfully reloaded ${data.length} application (/) commands.`);
		} catch (error) {
			console.error(`${utcNow()} - deployCommands - Command deployment failed`);
			console.error(error);
		}
	})();
}

module.exports = {
	deployCommands,
	wipeCommands,
	resetCommands
}