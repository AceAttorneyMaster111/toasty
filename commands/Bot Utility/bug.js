const { Command } = require('klasa');
const superagent = require('superagent');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: msg => msg.language.get('BUG_CMD_DESCIPRTION'),
      extendedHelp: msg => msg.language.get('BUG_CMD_EXTENDEDHELP'),
      runIn: ['text'],
      usage: '<bug:string>',
      cooldown: 30
    });
  }

  async run(msg, [bug]) {
    const invite = await msg.channel.createInvite({ maxAge: 0, reason: 'To allow Toasty support staff to join your server and fix the issue.' });
    const embed = new this.client.embed()
      .setColor('RED')
      .setTitle('Bug report from:')
      .setDescription(`**${msg.author.username}**#${msg.author.discriminator} (${msg.author.id})`)
      .addField('Bug:', bug)
      .addField(`Server: **${msg.guild.name}** (${msg.guild.id})`, invite)
    //const content = this.client.functions.clean(`**${msg.author.username}**#${msg.author.discriminator} (${msg.author.id}) reported a bug:\n${bug}\nServer: **${msg.guild.name}**\nID: **${msg.guild.id}**`);
    const id = '434879965486645259';
    new Promise((resolve, reject) => {
      superagent.post(`https://discordapp.com/api/channels/${id}/messages`)
        .set('Authorization', `Bot ${this.client.token}`).send({ embed })
        .end((err, res) => {
          if (err) {
            reject(err);
            msg.reply(msg.language.get('BUG_CMD_ERROR'));
          } else {
            resolve(res);
            msg.reply(msg.language.get('BUG_CMD'));
          }
        });
    });
  }

};
