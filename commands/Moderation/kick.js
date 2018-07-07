const { Command } = require('klasa');
const { caseNumber } = require('../../utils/caseNumber.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Kicks a user from the server.',
      extendedHelp: '**Example Usage:** `;kick @user spamming`',
      runIn: ['text'],
      usage: '<user:username> [reason:string] [...]',
      usageDelim: ' '
    });
  }

  async run(msg, [user, ...reason]) {
    const data = await this.client.database.getData(msg.guild.id);
    const member = await msg.guild.members.fetch(user).catch(() => null);
    if (user.id === this.client.user.id) return msg.reply('🚫 I can\'t kick myself \\:P');
    if (!member.kickable) return msg.reply('🚫 **Error:** I could not kick this user. Make sure that my highest role is above the user you are trying to kick.');
    const m = await msg.sendMessage('*Kicking user...*');
    await member.kick();
    if (data.modlog === 'disabled' || !msg.guild.channels.find('name', 'mod-log')) {
      m.edit(`**${member.user.username}**#${member.user.discriminator} has been kicked.`);
    } else
    if (data.modlog === 'enabled') {
      const embed = new this.client.embed();
      const channel = msg.guild.channels.find('name', 'mod-log');
      const caseNum = await caseNumber(this.client, channel);
      embed.setColor(0xFFA500)
        .setTimestamp(new Date())
        .setAuthor(member.user.username, member.user.displayAvatarURL())
        .setDescription(`**Action:** Kick\n**Target:** ${member.user.username}#${member.user.discriminator} (${member.user.id})\n**Responsible Moderator:** ${msg.author.username}#${msg.author.discriminator} (${msg.author.id})\n**Reason:** ${reason}`)
        .setFooter(`Case ${caseNum}`);
      channel.send({ embed }).catch(err => {
        return msg.sendMessage('🚫 **Error:** I couldn\'t send the kick embed in the #mod-log. Please make sure I have access to a channel called mod-log!');
      });
      m.edit(`**${member.user.username}**#${member.user.discriminator} has been kicked. I've logged it in the #mod-log.`);
    } else {
      m.edit(`**${member.user.username}**#${member.user.discriminator} has been kicked.`);
    }
  }
};
