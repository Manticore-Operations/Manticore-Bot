const { REST, Routes } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');
const index = require('./commands/index');
const { utcNow } = require('./helpers/date');

const deployCommands = () => {
// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

	if (!clientId) console.error('Client ID not defined!');
	if (!guildId) console.error('Guild ID not defined!');

	const commands = Object.values(index).map(c => c.data);

	(async () => {
		try {
			console.log(`${utcNow()} - Started refreshing ${commands.length} application (/) commands.`);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: commands },
			);

			console.log(`${utcNow()} - Successfully reloaded ${data.length} application (/) commands.`);
		} catch (error) {
			console.error(`${utcNow()} - Command deployment failed`);
			console.error(error);
		}
	})();
}

module.exports = {
	deployCommands
}