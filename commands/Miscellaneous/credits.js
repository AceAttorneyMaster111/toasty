const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: msg => msg.language.get('COMMAND_CREDITS_DESCRIPTION')
    });
  }

  run(msg) {
    const embed = new this.client.embed()
      .setTitle('Toasty Credits')
      .addField('Developer:', 'i am toast#1213')
      .addField('Contributors:', 'Dutchy#8775\nOGNovuh#0003\nAceAttorneyMaster111#4489')
      .addField('Mega Donators:', 'YTAlwaysPlug#9763\nrodcad66#0001\n아빠 [DAD]#5884')
      .addField('Translators:', '')
      .addField('Graphic Designers:', 'Oliver#7822')
    msg.sendEmbed(embed);
  }
};
