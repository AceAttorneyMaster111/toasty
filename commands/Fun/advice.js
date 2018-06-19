const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Get some advice!',
      cooldown: 2
    });
  }

  async run(msg) {
    let res = await this.client.get('http://api.adviceslip.com/advice');
    let advice = JSON.parse(res.body);
    try {
      const embed = new this.client.embed()
        .setAuthor('Here\'s some advice!', 'https://a.safe.moe/BVBr9.png')
        .setDescription(advice.slip.advice)
        .setColor('#727684');
      return msg.sendEmbed(embed);
    } catch (err) {
      return msg.sendMessage(`${err.name}: ${err.message}`);
    }
  }
};
