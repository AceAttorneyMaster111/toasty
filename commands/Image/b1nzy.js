const { Command } = require('klasa');
const Canvas = require('canvas');
const path = require('path');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Makes b1nzy talk.',
      cooldown: 7,
      usage: '<text:string>'
    });
  }

  async run(msg, [text]) {
    const r = await this.client.get('https://i.imgur.com/kcjeRDa.png');
    const discord = new Canvas.Font('discord', path.join(__dirname, '..', '..', 'assets', 'fonts', 'discord.ttf'));
    const canvas = new Canvas(489, 108);
    const ctx = canvas.getContext('2d');
    const base = new Canvas.Image();
    base.onload = () => {
      ctx.drawImage(base, 0, 0);
      ctx.addFont(discord)
      ctx.font = '16px discord';
      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, 80, 55);
      msg.channel.send({
        files: [{
          attachment: canvas.toBuffer()
        }]
      });
    }
    base.src = r.body;
  }
};
