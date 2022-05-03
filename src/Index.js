require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');

const allIntents = new Intents(32767);
const client = new Client({ intents: allIntents, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.commands = new Collection();

const handlers = fs.readdirSync('./src/handlers').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events/').filter(file => file.endsWith('.js'));
const commandDirs = fs.readdirSync('./src/commands');

(async () => {
	for (const handler of handlers) {
		require(`./handlers/${handler}`)(client);
	}
	client.eventHandler(eventFiles, './src/events/');
	client.commandHandler(commandDirs, './src/commands');
	client.login(process.env.DISCORD_TOKEN);
})();
// client.once('ready', () => {
//	console.log('I am just a businessman, giving the people what they want.');
// });

