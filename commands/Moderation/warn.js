const { Command } = require('klasa');
const { caseNumber } = require('../../utils/caseNumber.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Warns a user and logs it if the mod log is enabled.',
      runIn: ['text'],
      usage: '<user:username> <reason:string> [...]',
      usageDelim: ' '
    });
  }

  async run(msg, [user, ...reason]) {
    if (member.user.id === this.client.user.id) return msg.reply('I can\'t warn myself \\:P');

    const data = await this.client.database.getData(msg.guild.id);
    if (data.modlog === 'disabled' || !msg.guild.channels.find('name', 'mod-log')) {
      msg.reply(`🚫 The modlog must be enabled for me to issue warnings. Type, \`${msg.guildConfigs.prefix}toggle modlog\` to enable it.`);
    } else
    if (data.modlog === 'enabled') {
      const embed = new this.client.embed();
      const channel = msg.guild.channels.find('name', 'mod-log');
      const caseNum = await caseNumber(this.client, channel);
      embed.setColor(0xFFFF00)
        .setTimestamp(new Date())
        .setAuthor(member.user.username, member.user.displayAvatarURL())
        .setDescription(`**Action:** Warn\n**Target:** ${member.user.username}#${member.user.discriminator} (${member.user.id})\n**Responsible Moderator:** ${msg.author.username}#${msg.author.discriminator} (${msg.author.id})\n**Reason:** ${reason}`)
        .setFooter(`Case ${caseNum}`);
      channel.send({ embed }).catch(err => {
        return msg.reply(':warning: **Error:** I couldn\'t send the warning embed in the #mod-log. Please make sure I have access to a channel called mod-log!');
      });
      msg.delete();
      msg.sendMessage(`<@${member.user.id}>, 🚫 This is a warning!\n${reason}`);
    } else {
      msg.reply(`🚫 The modlog must be enabled for me to issue warnings. Type, \`${msg.guildConfigs.prefix}toggle modlog\` to enable it.`);
    }
  }

};
