const { Command } = require('klasa');
const Canvas = require('canvas');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Rest in peace.',
      runIn: ['text'],
      usage: '[text:string{1,20}]',
      cooldown: 10
    });
  }

  async run(msg, [text = msg.author.username]) {
    const r = await this.client.get('http://cliparts.co/cliparts/pi7/8ok/pi78okjMT.png')
      .catch(err => msg.sendMessage(`${err.name}: ${err.message}`));
    const canvas = new Canvas(504, 594);
    const ctx = canvas.getContext('2d');
    const img_bg = new Canvas.Image();
    img_bg.onload = () => {
      ctx.drawImage(img_bg, 0, 0, 504, 594);
      ctx.font = 'bold 40px Arial';
      let args;
      if (msg.mentions.users.size > 0) args = msg.mentions.users.first().username;
      else if (text.length > 1) args = text;
      else args = msg.author.username;
      ctx.fillText(args, 237 - ctx.measureText(args).width / 2, 330);
      ctx.font = 'bold 30px Arial';
      ctx.fillText(`???? - ${(new Date()).getFullYear()}`, 160, 380);
      msg.channel.send({
        files: [{
          attachment: canvas.toBuffer(),
          name: 'rip.jpg'
        }]
      });
    }
    img_bg.src = r.body;
  }
};
