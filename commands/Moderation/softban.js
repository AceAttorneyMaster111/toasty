const { Command } = require('klasa');
const { caseNumber } = require('../../utils/caseNumber.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      description: '',
      quotedStringSupport: false,
      usage: '<user:username> [days:int{1,7}] [reason:string] [...]',
      usageDelim: ' '
    });
  }

    async run(msg, [user, days = 1, ...reason]) {
      if (user.id === this.client.user.id) return msg.reply('I can\'t ban myself \\:P');
      if (user.id === msg.author.id) return msg.reply(``);
      if (user.bannable === false) return msg.reply(``);
      reason = reason.length > 0 ? `${reason.join(' ')}\nBanned By: ${msg.author.tag}` : `No reason specified.\nBanned By: ${msg.author.tag}`;
      await user.ban({ days: days, reason: reason });
      msg.guild.members.unban(user.id);
      return msg.sendMessage(`<:penguSuccess:435712876506775553> ***${user.username} ${msg.language.get('MESSAGE_SOFTBANNED')}***`);
    }
};
