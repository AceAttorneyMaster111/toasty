const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['emotes'],
      description: 'Sends all of the emojis / emotes on the server.',
      runIn: ['text'],
      cooldown: 2
    });
  }

  run(msg) {
    if (msg.guild.emojis.size === 0) {
      return msg.sendMessage('There are no emojis on this server.');
    }
    else if (msg.guild.emojis.map(e => e).join(' ').length > 1960) {
      let s = msg.guild.emojis.map(e => e).join(' ');
      let i = Math.ceil(s.length / 2);
      let partOne = s.slice(0, i).trim();
      let partTwo = s.slice(i + 1, s.length).trim();
      msg.sendMessage(`Emojis on **${msg.guild.name}**:\n${partOne}`);
      msg.sendMessage(partTwo);
    }
    else {
      msg.sendMessage(`Emojis on **${msg.guild.name}**:\n${msg.guild.emojis.map(e => e).join(' ')}`);
    }
  }
};
