const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: msg => msg.language.get('COMMAND_DONATE_DESCRIPTION')
    });
  }

  run(msg) {
    msg.sendMessage(msg.language.get('COMMAND_DONATE'));
  }
};