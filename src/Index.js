require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');

const allIntents = new Intents(32767);
const client = new Client({ intents:allIntents });

client.commands = new Collection();
client.events = new Collection();

const handlers = fs.readdirSync('./src/handlers');


(async () => {
	for (const handler of handlers) {
		require(`./handlers/${handler}`)(client);
	}
});
// client.once('ready', () => {
//	console.log('I am just a businessman, giving the people what they want.');
// });

client.login(process.env.DISCORD_TOKEN);