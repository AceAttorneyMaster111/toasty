const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Embeds the text you provide.',
      usage: '<text:string>',
      cooldown: 3
    });
  }

  run(msg, [text]) {
    const embed = new this.client.embed()
      .setColor('RANDOM')
      .setAuthor(msg.author.username, msg.author.avatarURL())
      .setDescription(text);
    msg.sendEmbed(embed);
  }
};
