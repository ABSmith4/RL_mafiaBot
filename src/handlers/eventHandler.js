const fs = require('fs');

module.exports = (client) => {
	client.eventHandler = async (eventDirs, path) => {

		for (const dirs of eventDirs) {
			const eventFiles = fs.readdirSync(`${path}/${dirs}`).filter(file => file.endsWith('.js'));
			for (const file of eventFiles) {
				const event = require(`../events/${dirs}/${file}`);
				if (event.once) {
					client.once(event.name, (...args) => event.execute(...args, client));
				}
				else {
					client.on(event.name, async (...args) => await event.execute(...args, client));
				}
			}
		}
	};
};