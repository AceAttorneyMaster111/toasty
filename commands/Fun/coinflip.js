const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Flips a coin.'
    });
  }

  async run(msg) {
    const options = ['heads', 'tails'];
    const m = await msg.sendMessage('Flipping.');
    setTimeout(() => { m.edit('Flipping..'); }, 350);
    setTimeout(() => { m.edit('Flipping...'); }, 700);
    setTimeout(() => { m.edit(`**${msg.author.username}**, you got **${this.client.functions.randomFromArray(options)}**!`); }, 1000);
  }
};
