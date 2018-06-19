const { Command } = require('klasa');
const fs = require('fs');
const path = require('path');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Roblox oof.',
      runIn: ['text'],
      cooldown: 5
    });
  }

  async run(msg) {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.reply('🚫 Please be in a voice channel first!');
    if (!this.client.voiceConnections.get(msg.channel.guild.id)) {
      const connection = await voiceChannel.join().catch(e => msg.sendMessage(`🚫 Something wen't wrong!\n${e}`));
      const dispatcher = connection.play(path.join(__dirname, '..', '..', 'assets', 'audio', 'oof', 'oof.mp3'));
      msg.react('☠');
      dispatcher.on('end', () => voiceChannel.leave());
    } else {
      msg.reply(`🚫 It seems like I'm already playing something on this server.\n*If nothing's playing, type* \`${msg.guild.configs.prefix}leave\` *and try again.*`);
    }
  }
};
