const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Rolls the provided numbers.',
      usage: '[num1:integer] [num2:integer]'
    });
  }

  run(msg, [num1 = 1, num2 = 6]) {
    msg.sendMessage(`**${msg.author.username}** 🎲, you rolled a **${(Math.floor(Math.random() * num2) + num1).toLocaleString()}**.`);
  }
};
