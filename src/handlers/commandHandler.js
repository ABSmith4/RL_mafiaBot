const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');


module.exports = (client) => {
	client.handleCommands =
	for (const folder of commandFolders){
		const commandFiles = fs.readdirSync(`./src/commands/${dirs}`).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`../commands/${folder}/${file}`);
			client.commands.set(command.name, command);
		}
	};
};