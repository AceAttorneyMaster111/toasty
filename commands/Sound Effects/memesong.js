const { Command } = require('klasa');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', '..', 'assets', 'audio', 'mememusic');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['mememusic'],
      description: 'Plays a random memey song.',
      runIn: ['text'],
      cooldown: 10
    });
  }

  async run(msg) {
    const files = fs.readdirSync(dir);
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.reply('🚫 Please be in a voice channel first!');
    if (!this.client.voiceConnections.get(msg.channel.guild.id)) {
      const connnection = await voiceChannel.join().catch(e => msg.sendMessage(`🚫 Something wen't wrong!\n${e}`));
      const dispatcher = connnection.play(`${dir}/${this.client.functions.randomFromArray(files)}`);
      msg.react('😂');
      dispatcher.on('end', () => voiceChannel.leave());
    } else {
      msg.reply(`🚫 It seems like I'm already playing something on this server.\n*If nothing's playing, type* \`${msg.guild.configs.prefix}leave\` *and try again.*`);
    }
  }
};
