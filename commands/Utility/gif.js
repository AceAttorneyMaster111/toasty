const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['giphy'],
      description: 'Searches for a gif on giphy.',
      usage: '<query:string>',
      cooldown: 2
    });
  }

  run(msg, [query]) {
    msg.sendMessage(`🎬 **${msg.author.username}**, http://giphy.com/search/${query.replace(' ', '-')}`);
  }
};
