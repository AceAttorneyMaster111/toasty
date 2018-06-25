const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['profile'],
      description: 'Sends the avatar of you or the mentioned user.',
      usage: '[user:username]',
    });
  }

  run(msg, [user = msg.author]) {
    const embed = new this.client.embed()
      .setDescription(`**${user.username}**'s avatar:`)
      .setImage(user.avatarURL())
    msg.sendEmbed(embed);
  }
};
