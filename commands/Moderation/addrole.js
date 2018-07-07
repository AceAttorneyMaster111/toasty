const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['giverole'],
      description: 'Gives a user a role.',
      runIn: ['text'],
      extendedHelp: '**Example Usage:** `;addrole @user role`',
      usage: '<member:username> <role:rolename> [...]',
      usageDelim: ' '
    });
  }

  async run(msg, [member, ...role]) {
    const user = await msg.guild.members.fetch(member.id);
    if (member.roles.has(role.id)) return msg.reply('🚫 That user already has that role!');
    if (msg.guild.me.roles.highest.comparePositionTo(role) < 1) return msg.reply('🚫 [**Missing Permissions**]: I don\'t have permissions to edit this role, please check the role order!');
    if (msg.member.roles.highest.comparePositionTo(role) < 1) return msg.reply('🚫 [**Invalid Permissions**]: You don\'t have access to this role, please check role order!');
    await member.roles.add(role);
    msg.sendMessage(`✅ I have added the role of **${role.name}** to **${user.username}**.`);
  }
};
