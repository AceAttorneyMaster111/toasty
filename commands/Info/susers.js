const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['serverusers', 'membercount', 'usercount'],
      memberName: 'susers',
      description: 'Sends the amount of users on the server.',
      runIn: ['text']
    });
  }

  run(msg) {
    msg.sendMessage(`There are **${msg.guild.memberCount.toLocaleString()}** members on this server.`);
  }
};
