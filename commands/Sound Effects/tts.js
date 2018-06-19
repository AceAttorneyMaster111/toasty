const { Command } = require('klasa');
const tts = require('google-tts-api');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Joins your voice channel and speaks the given text.',
      runIn: ['text'],
      usage: '<text:string{1,200}>',
      cooldown: 10
    });
  }

  async run(msg, [text]) {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) return msg.reply('🚫 Please be in a voice channel first!');
    if (!this.client.voiceConnections.get(msg.channel.guild.id)) {
      const connection = await voiceChannel.join().catch(e => msg.sendMessage(`🚫 Something wen't wrong!\n${e}`));
      const url = await tts(text, 'en', 1);
      const dispatcher = connection.play(url);
      msg.react('📢');
      dispatcher.on('end', () => voiceChannel.leave());
    } else {
      msg.say(`🚫 It seems like I'm already playing something on this server.\n*If nothing's playing, type* \`${msg.guild.configs.prefix}leave\` *and try again.*`);
    }
  }
};
