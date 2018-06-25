const { Command } = require('klasa');
const moment = require('moment-timezone');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['server-info', 'server', 'guild', 'guildinfo'],
      description: 'Get detailed info on the server.',
      runIn: ['text'],
      cooldown: 2
    });
  }

  async run(msg) {
    const guild = await msg.guild.members.fetch();
    //const bots = `${guild.members.filter(member => member.user.bot).size} bots`;
    //const onlinePeeps = `${guild.members.size} members\n${guild.members.filter(member => member.presence.status !== 'offline').size} online`;

    const embed = new this.client.embed()
      .setColor('RANDOM')
      .setAuthor(`${msg.guild.name} (${msg.guild.id})`, msg.guild.iconURL())
      .addField('Created at', moment(msg.guild.createdAt).tz('America/Chicago').format('dddd, MMMM Do YYYY, h:mm:ss a zz'), true)
      .addField('Owner', `${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator} (${msg.guild.owner.id})`)
      .addField('Channels', msg.guild.channels.size, true)
      //.addField('Members', `${onlinePeeps} ${bots}`, true);
      .addField('Members', msg.guild.memberCount, true);
    if (msg.guild.roles.size >= 10) embed.addField('Roles', msg.guild.roles.size, true);
    else embed.addField('Roles', msg.guild.roles.map(role => role).join(' '), true);
    return msg.sendEmbed(embed).catch(() => null);
  }
};
