const { Command } = require('klasa');
const { stripIndents } = require('common-tags');
const moment = require('moment-timezone');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['user', 'user-info'],
      description: 'Get detailed info on a user.',
      runIn: ['text'],
      usage: '[member:member]',
    });
  }

  async run(msg, [member = msg.author]) {
    const statuses = {
      online: '212789758110334977',
      idle: '212789859071426561',
      dnd: '236744731088912384',
      offline: '212790005943369728'
    };

    const user = member.user || msg.author;

    const embed = new this.client.embed()
      .setAuthor(`${user.username}#${user.discriminator} (${user.id})`, user.avatarURL())
      .setThumbnail(user.displayAvatarURL())
      .addField('**User Information**', stripIndents`
		    Account Creation: ${moment(user.createdAt).tz('America/Chicago').format('dddd, MMMM Do YYYY, h:mm:ss a zz')}
		    Status: ${user.presence.status}
		    Game: ${user.presence.game ? user.presence.game.name : 'N/A'}
		  `)
      .addField('**Member Information**', stripIndents`
	      Joined Server At: ${moment(member.joinedAt).tz('America/Chicago').format('dddd, MMMM Do YYYY, h:mm:ss a zz')}
		    Nickname: ${member.nickname ? member.nickname : 'N/A'}
		  `);
    if (!member.roles || member.roles == null) {
      embed.addField('Roles', 'This user has no roles.');
      msg.sendEmbed(embed);
      return;
    }
    if (member.roles.size > 1) {
      if (member.roles.size <= 10) {
        embed.addField('Roles', member.roles.map(role => {
          if (role.name !== '@everyone') return role.name;
          return '';
        }).join(', '), true);
      } else {
        embed.addField('Roles', 'Too many to display', true);
      }
    }
    return msg.sendEmbed(embed);
  }
};
