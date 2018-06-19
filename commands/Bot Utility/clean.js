const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: msg => msg.language.get('CLEAN_CMD_DESCRIPTION'),
      cooldown: 15
    });
  }

  async run(msg) {
    const msgs = await msg.channel.messages.fetch({ limit: 90 });
    const msgArray = msgs.filter(mes =>
      mes.author.id === this.client.user.id
      || mes.content.startsWith(msg.configs.prefix)
      || mes.content.toLowerCase().startsWith('cancel')
    );
    msg.channel.bulkDelete(msgArray);
    msg.sendMessage(msg.language.get('CLEAN_CMD'));
    setTimeout(() => { msg.delete() }, 2000);
    return null;
  }
};
