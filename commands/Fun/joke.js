const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['dadjoke'],
      description: 'Sends a random dad joke.',
      cooldown: 2
    });
  }

  async run(msg) {
    const { body } = await this.client.get('https://icanhazdadjoke.com/')
      .set('Accept', 'application/json')
      .catch(err => msg.sendMessage(`${err.name}: ${err.message}`));
    msg.sendMessage(`**${msg.author.username}**, ${body.joke}`);
  }
};
