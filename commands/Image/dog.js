const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Images and gifs of dogs!',
      cooldown: 5
    });
  }

  async run(msg) {
    const { body } = await this.client.get('https://api-v2.weeb.sh/images/random?type=animal_dog')
      .set('Authorization', `Wolke ${this.client.config.tokens.weebsh}`)
      .catch(err => msg.sendMessage(`${err.name}: ${err.message}`));
    const embed = new this.client.embed()
      .setColor('RANDOM')
      .setImage(body.url);
    msg.sendEmbed(embed);
  }
};
