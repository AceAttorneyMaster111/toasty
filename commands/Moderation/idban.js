const { Command } = require('klasa');
const { caseNumber } = require('../../utils/caseNumber.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['banid'],
      description: 'Ban a user by their ID from the server.',
      extendedHelp: '**Example Usage:** `ban 208946659361554432`',
      runIn: ['text'],
      usage: '<user:string>'
    });
  }

  async run(msg, [user]) {
    if (user === this.client.user.id) return msg.reply('I can\'t ban myself \\:P');
    const m = await msg.sendMessage('*Banning user...*');
    const ban = await msg.guild.members.ban(user).catch(e => m.edit('🚫 That\'s not a valid user ID.'));
    m.edit(`✅ I've banned the user ID of ${user}`);
  }
};
