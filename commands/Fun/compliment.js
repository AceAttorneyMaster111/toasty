const { Command } = require('klasa');
const generator = require('insult-compliment');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Compliments yourself or someone else.',
      usage: '[person:string]',
      cooldown: 2
    });
  }

  run(msg, [person = msg.author]) {
    const emojis = ['😄', '😉', '😋', '👌', '😊', '😇', '😀', '😜'];
    msg.sendMessage(`**${person}**, ${this.client.functions.randomFromArray(emojis)} ${generator.Compliment()}`);
  }
};
