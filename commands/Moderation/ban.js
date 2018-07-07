const { Command } = require('klasa');
const { caseNumber } = require('../../utils/caseNumber.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Ban a user from the server.',
      extendedHelp: '**Example Usage:** `;ban @user advertising`',
      runIn: ['text'],
      usage: '<user:username> [reason:string] [...]',
      usageDelim: ' '
    });
  }

  async run(msg, [user, ...reason]) {
    const data = await this.client.database.getData(msg.guild.id);
    if (user.id === this.client.user.id) return msg.reply('I can\'t ban myself \\:P');
    const member = await msg.guild.members.fetch(user).catch(() => null);
    await msg.sendMessage('Are you sure you want to ban this user?  (__y__es or __n__o)');
    await msg.embed({
      author: {
        name: `${user.username}#${user.discriminator} (${user.id})`,
        icon_url: user.avatarURL
      },
      fields: [
        {
          name: 'Reason:',
          value: reason
        }
      ],
      timestamp: new Date()
    });

    msg.channel.awaitMessages(response => ['y', 'yes', 'n', 'no', 'cancel'].includes(response.content) && response.author.id === msg.author.id, {
      max: 1,
      time: 30000
    }).then(async co => {
      if (['yes', 'y'].includes(co.first().content)) {
        const m = await msg.sendMessage('*Banning user...*');
        await msg.guild.members.ban(user, 7);
        if (data.modlog === 'disabled' || !msg.guild.channels.find('name', 'mod-log')) {
          m.edit(`**${member.user.username}**#${member.user.discriminator} has been banned.`);
        } else
        if (data.modlog === 'enabled') {
          const embed = new this.client.embed();
          const channel = msg.guild.channels.find('name', 'mod-log');
          const caseNum = await caseNumber(this.client, channel);
          embed.setColor(0xFF0000)
            .setTimestamp(new Date())
            .setAuthor(member.user.username, member.user.displayAvatarURL())
            .setDescription(`**Action:** Ban\n**Target:** ${member.user.username}#${member.user.discriminator} (${member.user.id})\n**Responsible Moderator:** ${msg.author.username}#${msg.author.discriminator} (${msg.author.id})\n**Reason:** ${reason}`)
            .setFooter(`Case ${caseNum}`);
          channel.send({ embed }).catch(err => msg.reply(':no_entry_sign: **Error:** I couldn\'t send the ban embed in the #mod-log. Please make sure I have access to a channel called mod-log!'));
          m.edit(`**${member.user.username}**#${member.user.discriminator} has been banned. I've logged it in the #mod-log.`);
        } else {
          m.edit(`**${member.user.username}**#${member.user.discriminator} has been banned.`);
        }
      } else if (['n', 'no', 'cancel'].includes(co.first().content)) {
        return msg.sendMessage('Got it, I won\'t ban the user.');
      }
    }).catch(() => msg.sendMessage('Aborting ban, took longer than 30 seconds to reply.'));
  }
};
