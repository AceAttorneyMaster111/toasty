const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Sets the bot\'s game. [Bot Developer Only]',
      usage: '[game:string]'
    });
  }

  async run(msg, [game]) {
    await this.client.shard.broadcastEval(`this.user.setActivity(\`${game}\`)`).catch(e => msg.say(`${e.name}: ${e.message}`));
    msg.sendMessage(`I'm now playing **${game}**.`);
  }
};
