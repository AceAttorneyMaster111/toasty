const { PermissionLevels } = require('klasa');

module.exports = new PermissionLevels()
  // Everyone
  .add(0, () => true)
  // DJ
  //.add(1, (m) => m.guild && m.guild.configs.permissions.dj.includes(m.member.id), { fetch: true })
  // Has Manage Messages permission
  .add(2, (m) => m.guild && m.member.permissions.has('MANAGE_MESSAGES'), { fetch: true })
  // Has Kick Members permission
  .add(3, (m) => m.guild && m.member.permissions.has('KICK_MEMBERS'), { fetch: true })
  // Has Ban Members permission
  .add(4, (m) => m.guild && m.member.permissions.has('BAN_MEMBERS'), { fetch: true })
  // Has Administrator permission
  .add(4, (m) => m.guild && m.member.permissions.has('ADMINISTRATOR'), { fetch: true })
  // Must be Guild Owner
  .add(6, (m) => m.guild && m.member === m.guild.owner, { fetch: true })
  /*
   * Allows the Bot Owner to use any lower commands
   * and causes any command with a permission level 8 or lower to return an error if no check passes.
   */
  .add(8, (m, c) => m.author === c.owner, { break: true })
  // Allows the bot developer to use bot developer only commands, which silently fail for other users.
  .add(9, (m, c) => m.author === c.owner);
