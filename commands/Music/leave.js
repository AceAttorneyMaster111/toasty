const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Force-leaves the voice channel when even the `stop` command doesn\'t work.',
      cooldown: 3,
      runIn: ['text']
    });
  }

  run(msg) {
    if (!msg.guild.me.voiceChannel) {
      return msg.reply('🚫 I\'m not connected to a voice channel, silly!');
    } else {
      if (msg.guild.voiceConnection && msg.guild.voiceConnection.dispatcher) msg.guild.voiceConnection.dispatcher.end();
      msg.guild.me.voiceChannel.leave();
      return msg.reply('✅ successfully left the voice channel.');
    }
  }
};
