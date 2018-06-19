const { Command } = require('klasa');
const superagent = require('superagent');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Allows you to suggest a feature for the bot.',
      extendedHelp: '**Example Usage:** `suggest make a meme command`',
      runIn: ['text'],
      usage: '<suggestion:string>',
      cooldown: 30
    });
  }

  run(msg, [suggestion]) {
    const content = this.client.clean(`**${msg.author.username}**#${msg.author.discriminator} (${msg.author.id}) suggested a feature:\n${suggestion}\nServer: **${msg.guild.name}**\nID: **${msg.guild.id}**`);
    const id = '303204291198451715';
    new Promise((resolve, reject) => {
      superagent.post(`https://discordapp.com/api/channels/${id}/messages`)
        .set('Authorization', `Bot ${this.client.token}`).send({ content })
        .end((err, res) => {
          if (err) {
            reject(err);
            msg.reply('❌ There was an error while sending your suggestion to Toasty HQ. Please try again later.');
          } else {
            resolve(res);
            msg.say(`✅ **${msg.author.username}**, your suggestion has successfully been submitted to Toasty HQ for review. Thank you!\nTo see if your suggestion was accepted, join **https://toastybot.com/hq**.`);
          }
        });
    });
  }

};
