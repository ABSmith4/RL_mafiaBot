require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');

const allIntents = new Intents(32767);
const client = new Client({ intents:allIntents });

client.commands = new Collection();
client.events = new Collection();

['commandHandler', 'eventHandler'].forEach(handler => {
	// eslint-disable-next-line no-undef
	require(`./handlers/${handler}`)(client);
});

// client.once('ready', () => {
//	console.log('I am just a businessman, giving the people what they want.');
// });

client.login(process.env.DISCORD_TOKEN);