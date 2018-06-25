const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['roleusers'],
      description: 'Shows all the users who have a particular role on the server.',
      runIn: ['text'],
      usage: '<role:rolename>'
    });
  }

  run(msg, [role]) {
    const arr = new Array(), o = new Object();
    msg.guild.members.forEach(member => {
      if (member.roles.size > 1) {
        if (member.roles.find(_role => _role.name === role.name)) {
          arr.push(`\`${member.user.tag}\``);
        }
      } else {
        return;
      }
    });

    if (arr.join(' ').length > 1900) return msg.sendMessage(`Users with the role, **__${role.name}__** (**${arr.length}** results)\n\nToo many users to display.`);
    msg.sendMessage(`Users with the role, **__${role.name}__** (**${arr.length}** results)\n\n${arr.join(', ')}`);
  }
};
