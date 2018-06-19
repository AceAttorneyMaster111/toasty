const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['( ͡° ͜ʖ ͡°)'],
      description: '( ͡° ͜ʖ ͡°)'
    });
  }

  run(msg) {
    msg.sendMessage('( ͡° ͜ʖ ͡°)');
  }
};
