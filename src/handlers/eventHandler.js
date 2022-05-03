module.exports = (client) => {
	client.eventHandler = async (eventFiles) => {
		for (const file of eventFiles) {
			const event = require(`../events/${file}`);
			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args, client));
			}
			else {
				client.on(event.name, async (...args) => await event.execute(...args, client));
			}
		}
	};
};
