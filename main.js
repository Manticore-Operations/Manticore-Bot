const { Client, GatewayIntentBits, Events, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const dp = require('./deployCommands');
const { TOKEN } = require('./config');
const index = require('./commands/index');
const { utcNow } = require('./helpers/date');
const { Logger } = require('./services/logger');

client.commands = new Collection();
const commands = Object.values(index);
const logger = new Logger();

const main = async () => {
	await dp.deployCommands();

	// TODO: move to a better place
	logger.log('main', `Adding ${commands.length} commands to client`)
	for (const command of commands) {
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			logger.log('main', `Command ${command.data.name} added`);
		} else {
			logger.log('main', `[WARNING] The command ${command} is missing a required "data" or "execute" property.`);
		}
	}

	client.on(Events.InteractionCreate, async interaction => {
		if (!interaction.isChatInputCommand()) return;
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error('main', `No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	});

	client.on('ready', () => {
		logger.log('main', `Logged in as ${client.user.tag}!`);
	});

	// Has to be at the bottom of the file
	client.login(TOKEN);
}

main();
