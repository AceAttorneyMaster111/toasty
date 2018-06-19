const { Command } = require('klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['yesorno'],
			description: 'Answers with a gif saying yes or no.',
      usage: '[question:string]'
		});
	}

	async run(msg, [question = '']) {
	  const { body } = await this.client.get('https://yesno.wtf/api')
      .catch(err => msg.sendMessage(`${err.name}: ${err.message}`));
  	const embed = new this.client.embed()
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setTitle(question)
			.setColor('RANDOM')
      .setImage(body.image)
    msg.sendEmbed(embed);
	}
};
