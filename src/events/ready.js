// const { once } = require("events");

module.exports = {
	name: 'ready',
	once: true,
	async execute() {
		console.log('I am just a businessman, giving the people what they want.');
	},
};