const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Checks the bot\'s ping.'
    });
  }

  run(msg) {
    msg.sendMessage(`🏓 Pong! **${this.client.ping.toFixed(0)}**ms`);
  }
};
