const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: msg => msg.language.get('COMMAND_INVITE_DESCRIPTION'),
      aliases: ['oauth'],
      guarded: true
    });
  }

  run(msg) {
    msg.reply(msg.language.get('COMMAND_INVITE'));
  }
};
