const { Command } = require('klasa');
const leet = require('1337');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Translate\'s your text into leet (1337).',
      usage: '<text:string>'
    });
  }

  run(msg, [text]) {
    msg.sendMessage(leet(text));
  }
};
