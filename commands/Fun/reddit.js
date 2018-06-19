const { Command } = require('klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: 'Displays a random post from the specified sub-reddit.',
      extendedHelp: '**Example Usage:** `reddit gaming`, `reddit bestof`',
      usage: '<subreddit:string>',
      cooldown: 4
		});
	}

	async run(msg, [subreddit]) {
		try {
			const { body } = await this.client.get(`https://www.reddit.com/r/${subreddit}.json`)
				.query({ limit: 1000 })
      	.catch(err => {
					msg.sendMessage(`🚫 Something went wrong while trying to search that subreddit.\n${err.message}`);
				});
			const allowed = msg.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
			if (!allowed.length) return msg.sendMessage('🚫 This post contains NSFW content! If you would like to view it, you can run this command in a NSFW channel.');
			const embed = new this.client.embed();
			let data = this.client.functions.randomFromArray(allowed).data;
			embed.setColor('#FF4500')
				.setAuthor(`Requested by ${msg.author.username}`, msg.author.avatarURL())
				.setTitle(data.title)
				.setURL(`https://reddit.com${data.permalink}`)
				.setImage(data.url)
		  	.setFooter(`${data.subreddit_name_prefixed} | 👍 ${data.ups}`)
	  	msg.sendEmbed(embed);
	  } catch(err) {
			msg.reply('🚫 **Error:** Something went wrong while trying to search for that subreddit. The subreddit may not exist, or is invite-only.');
		}
	}
};
