const { Command } = require('klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['showerthoughts'],
			description: 'Thoughts in the shower.'
		});
	}

	async run(msg) {
		const { body } = await this.client.get('https://www.reddit.com/r/Showerthoughts.json')
			.query({ limit: 1000 });
		const allowed = msg.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
		if (!allowed.length) return msg.sendMessage('Hmm... It seems the thoughts are all gone right now. Try again later!');
		msg.sendMessage(`🤔 ${this.client.functions.randomFromArray(allowed).data.title}`);
	}
};
