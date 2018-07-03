const { Command } = require('klasa');

const cookies = [
  'http://media.giphy.com/media/hpfInSxkkLdpS/giphy.gif',
  'https://bakemetasty.files.wordpress.com/2013/11/gickr-com_80536e1a-031e-bc54-e19c-b45f61247c58.gif',
  'https://i.imgur.com/IblDria.gif',
  'http://1.bp.blogspot.com/-zyNwGvYnKYI/VHS4rR3GcvI/AAAAAAAAA2Y/YPzGHMd0yLk/s1600/cookies-baking-time-lapse-its-alive.gif',
  'https://www.heyrick.co.uk/random/cookies.gif',
  'https://www.handletheheat.com/wp-content/uploads/2018/02/BAKERY-STYLE-CHOCOLATE-CHIP-COOKIES-9-768x768.jpg',
  'https://www.cookingclassy.com/wp-content/uploads/2014/08/pumpkin_oat_chocolate_chip_cookies.-480x270.jpg',
  'http://dtlon6z3v1kfl.cloudfront.net/wp-content/uploads/2017/06/18165023/eb52c020-c145-440c-8445-911f133c0096.jpg',
  'http://www.scoopmeacookie.com/151-thickbox_default/three-chocolate-cookie.jpg',
  'https://images-gmi-pmc.edge-generalmills.com/25c50d46-aac2-4a0b-a7d0-fe0276f54548.jpg',
  'https://assets.bonappetit.com/photos/58e2844b65366d7ba90812ea/16:9/w_1000,c_limit/0417-Brown-Butter-Toffee-ChocolateChip%20Cookie-group.jpg',
  'https://pbs.twimg.com/profile_images/552145045663408129/egywNuyx_400x400.png',
  'https://static.smuckersrms.com/PhotoImage.ashx?recipeid=2102&w=600&h=600',
  'https://smittenkitchendotcom.files.wordpress.com/2016/05/confetti-cookies1.jpg?w=1200',
  'https://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/201211-xl-chocolate-brownie-cookies.jpg?itok=sZ9yTpv9',
  'https://hips.hearstapps.com/vidthumb/images/delish-cheesecake-stuffed-cookies-still002-1520633108.jpg',
  'https://iambaker.net/wp-content/uploads/2018/06/Whoopie-pie-birthday.jpg',
  'https://assets.marthastewart.com/styles/wmax-1500/d48/caramel-stuffed-chocolate-chip-cookies-103014899/caramel-stuffed-chocolate-chip-cookies-103014899_horiz.jpg?itok=Xg4BvKCH',
  'https://media.giphy.com/media/5t3FyUHyJiUyA/giphy.gif',
  'https://media.giphy.com/media/nAErqE3k2C3fy/giphy.gif',
  'https://media.giphy.com/media/7GYHmjk6vlqY8/giphy.gif',
  'https://media.giphy.com/media/S3HBZs20Up1UQ/giphy.gif',
  'https://media.giphy.com/media/59Ve1fnBdol8c/giphy.gif',
  'https://media.giphy.com/media/DVEmc30Aoptsc/giphy.gif',
  'https://media.giphy.com/media/INYRyEM6hPbcQ/giphy.gif',
  'https://media.giphy.com/media/4ji2aiquPipy0/giphy.gif',
  'https://media.giphy.com/media/xT0xeMA62E1XIlup68/giphy.gif'
];

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Give a user a cookie!',
      memberName: 'cookie',
      runIn: ['text'],
      usage: '<user:username>',
      cooldown: 10
    });
  }

  async run(msg, [user]) {
    const embed = new this.client.embed()
      .setColor('RANDOM')
      .setDescription(`🍪 **| ${msg.author.username}** has given **${user}** a cookie!`)
      .setImage(this.client.functions.randomFromArray(cookies))
    msg.sendEmbed(embed);
  }
};
