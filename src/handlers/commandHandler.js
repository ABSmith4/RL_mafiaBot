const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = (client) => {
	client.commandHandler = async (commandDirs) => {
		client.commandArray = [];
		for (const folder of commandDirs) {
			const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
			for (const file of commandFiles) {
				const command = require(`../commands/${folder}/${file}`);
				client.commands.set(command.data.name, command);
				client.commandArray.push(command.data.toJSON());
			}
		}
		const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

		(async () => {
			try {
				console.log('Started refreshing application (/) commands.');

				await rest.put(
					Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
					{ body: client.commandArray },
				);

				console.log('Successfully reloaded application (/) commands.');
			}
			catch (error) {
				console.error(error);
			}
		})();
	};
};
