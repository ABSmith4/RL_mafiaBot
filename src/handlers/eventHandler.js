const fs = require('fs');

module.exports = (client) => {
	const loadDir = (dirs) => {
		const eventFolders = fs.readdirSync(`./src/events/${dirs}`).filter(file => file.endsWith('.js'));

		for (const file of eventFolders) {
			const event = require(`../events/${dirs}/${file}`).filter((file));
			if (client.once) {
				client.once(event.name, (...args) => event.execute(...args, client));
			}
			else {
				client.on(event.name, async (...args) => await event.execute(...args, client));
			}
		}
	};
	['client', 'guild'].forEach(events => loadDir(events));
};