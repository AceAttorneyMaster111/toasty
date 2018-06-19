const { Command } = require('klasa');
const superagent = require('superagent');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Allows you to report a bug.',
      extendedHelp: '**Example Usage:** `bug the ping command doesn\'t work`',
      runIn: ['text'],
      usage: '<bug:string>',
      cooldown: 30
    });
  }

  run(msg, [bug]) {
    const content = this.client.functions.clean(`**${msg.author.username}**#${msg.author.discriminator} (${msg.author.id}) reported a bug:\n${bug}\nServer: **${msg.guild.name}**\nID: **${msg.guild.id}**`);
    const id = '434879965486645259';
    new Promise((resolve, reject) => {
      superagent.post(`https://discordapp.com/api/channels/${id}/messages`)
        .set('Authorization', `Bot ${this.client.token}`).send({ content })
        .end((err, res) => {
          if (err) {
            reject(err);
            msg.reply('❌ There was an error while sending your bug report to Toasty HQ. Please try again later.');
          } else {
            resolve(res);
            msg.say(`✅ **${msg.author.username}**, your bug report has successfully been submitted to Toasty HQ for review. Thank you!\nFor more information on it, join **https://toastybot.com/hq**.`);
          }
        });
    });
  }

};
