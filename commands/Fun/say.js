const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['echo'],
      description: 'Says what you specified.',
      usage: '<text:string>'
    });
  }

  run(msg, [text]) {
    msg.sendMessage(this.client.clean(text));
  }
};
