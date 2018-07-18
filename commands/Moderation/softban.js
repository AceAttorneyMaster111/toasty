const { Command } = require('klasa');
const { caseNumber } = require('../../utils/caseNumber.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      runIn: ['text'],
      description: '',
      quotedStringSupport: false,
      usage: '<user:user> [days:int{1,7}] [reason:string] [...]',
      usageDelim: ' '
    });
  }

    async run(msg, [user, days = 1, ...reason]) {
      if (user.id === this.client.user.id) return msg.reply('I can\'t ban myself \\:P');
      if (user.id === msg.author.id) return msg.reply('You can\'t ban yourself \\:P');
      const member = await msg.guild.members.fetch(user).catch(() => null);
      await member.ban({ days, reason });
      setTimeout(() => {
        msg.guild.members.unban(user.id);
        msg.sendMessage(`✅ I've successfully softbanned **${user.username}**#${user.discriminator}.`);
      }, 200);
    }
};
