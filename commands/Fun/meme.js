const { Command } = require('klasa');
const randomPuppy = require('random-puppy');

const subreddits = [
  'memes',
  'DeepFriedMemes',
  'bonehurtingjuice',
  'surrealmemes',
  'dankmemes',
  'meirl',
  'me_irl',
  'funny'
];

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Sends a random meme from a subreddit.',
      cooldown: 3
    });
  }

  async run(msg) {
    let meme = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
    let url = await randomPuppy(meme);
    const embed = new this.client.embed()
      .setFooter(`/r/${meme}`)
      .setImage(url)
      .setColor('RANDOM');
    msg.sendEmbed(embed);
  }
};
