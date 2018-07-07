const { Command } = require('klasa');
const { Util } = require('discord.js');
const twemoji = require('twemoji');
const fs = require('fs');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Makes the provided emoji jumbo sized.',
      usage: '<emoji:string>',
      cooldown: 3
    });
  }

  async run(msg, [emoji]) {
    try {
      const emote = Util.parseEmoji(emoji);
      if (emote.animated === true) {
        const URL = `https://cdn.discordapp.com/emojis/${emote.id}.gif?v=1`;
        const { body: buffer } = await this.client.get(URL);
        const toSend = fs.writeFileSync('emote.gif', buffer);
        await msg.channel.send({
          files: [{
            attachment: toSend
          }]
        });
      } else if (emote.id === null) {
        const twemote = twemoji.parse(emoji);
        const regex = /src="(.+)"/g;
        const regTwemote = regex.exec(twemote)[1];
        const { body: buffer } = await this.client.get(regTwemote);
        const toSend = fs.writeFileSync('emote.png', buffer);
        await msg.channel.send({
          files: [{
            attachment: toSend
          }]
        });
      } else {
        const URL = `https://cdn.discordapp.com/emojis/${emote.id}.png`;
        const { body: buffer } = await this.client.get(URL);
        const toSend = fs.writeFileSync('emote.png', buffer);
        await msg.channel.send({
          files: [{
            attachment: toSend
          }]
        });
      }
    } catch (err) {
      console.log(err)
      if (err.message === 'TypeError: Cannot read property \'1\' of null') {
        msg.reply('🚫 You didn\'t provide a real emoji.');
      }
    }
  }
};
