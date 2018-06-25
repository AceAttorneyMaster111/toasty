const { Command } = require('klasa');
const superagent = require('superagent');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: msg => msg.language.get('SUGGEST_CMD_DESCRIPTION'),
      extendedHelp: msg => msg.language.get('SUGGEST_CMD_EXTENDEDHELP'),
      runIn: ['text'],
      usage: '<suggestion:string>',
      cooldown: 30
    });
  }

  async run(msg, [suggestion]) {
    const invite = await msg.channel.createInvite({ maxAge: 0, reason: 'To allow Toasty support staff to join your server.' });
    const embed = new this.client.embed()
      .setColor('GREEN')
      .setTitle('Suggestion from:')
      .setDescription(`**${msg.author.username}**#${msg.author.discriminator} (${msg.author.id})`)
      .addField('Suggestion:', suggestion)
      .addField(`Server: **${msg.guild.name}** (${msg.guild.id})`, invite)
    //const content = this.client.functions.clean(`**${msg.author.username}**#${msg.author.discriminator} (${msg.author.id}) suggested a feature:\n${suggestion}\nServer: **${msg.guild.name}**\nID: **${msg.guild.id}**`);
    const id = '303204291198451715';
    new Promise((resolve, reject) => {
      superagent.post(`https://discordapp.com/api/channels/${id}/messages`)
        .set('Authorization', `Bot ${this.client.token}`).send({ embed })
        .end((err, res) => {
          if (err) {
            reject(err);
            msg.reply(msg.language.get('SUGGEST_CMD_ERROR'));
          } else {
            resolve(res);
            msg.reply(msg.language.get('SUGGEST_CMD'));
          }
        });
    });
  }

};
