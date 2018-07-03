const { Command } = require('klasa');
const Canvas = require('canvas');
const fs = require('fs');
const path = require('path');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Puts a user on a wanted poster.',
      runIn: ['text'],
      cooldown: 10
    });
  }

  async run(msg) {
    const args = msg.content.split(' ').slice(1);

    let avatarurl = (msg.mentions.users.size > 0 ? msg.mentions.users.first().displayAvatarURL({ format: 'png' }) : msg.author.displayAvatarURL({ format: 'png' }));
    if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
      avatarurl = args.join(' ').replace(/gif|webp/g, 'png');
    }

    try {
      const Image = Canvas.Image;
      const canvas = new Canvas(741, 1000);
      const ctx = canvas.getContext('2d');
      const base = new Image();
      const avatar = new Image();
      const generate = () => {
        ctx.drawImage(base, 0, 0);
        ctx.drawImage(avatar, 150, 360, 430, 430);
      };
      base.src = await fs.readFileAsync(path.join(__dirname, '..', '..', 'assets', 'images', 'wanted.png'));
      const { body } = await this.client.get(avatarurl);
      avatar.src = body;
      generate();
      msg.channel.send({
        files: [{
          attachment: canvas.toBuffer(),
          name: 'wanted.png'
        }]
      });
    } catch (err) {
      return msg.sendMessage(`${err.name}: ${err.message}`);
    }
  }
};
