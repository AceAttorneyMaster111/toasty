const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['takerole', 'take'],
      description: 'Removes a role from a user.',
      runIn: ['text'],
      extendedHelp: '**Example Usage:** `;removerole @user Members`',
      usage: '<user:username> <role:rolename> [...]',
      usageDelim: ' '
    });
  }

  async run(msg, [user, ...role]) {
    const botMember = await msg.guild.members.fetch(this.client.user);
    if (!member.roles.has(role.id)) return msg.reply('🚫 That user doesn\'t have that role!');
    if (botMember.roles.highest.comparePositionTo(role) < 1) return msg.reply('🚫 [**Missing Permissions**]: I don\'t have permissions to edit this role, please check the role order!');
    if (msg.member.roles.highest.comparePositionTo(role) < 1) return msg.reply('🚫 [**Invalid Permissions**]: You don\'t have access to this role, please check role order!');
    const m = await msg.sendMessasge('*Removing...*');
    await member.roles.remove(role);
    return m.edit(`✅ I have removed the role of **${role.name}** from **${user.username}**.`);
  }
};
