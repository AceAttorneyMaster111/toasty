const { Command } = require('klasa');
const urban = require('urban');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Search for definitions on the Urban Dictionary.',
      usage: '<query:string>',
      cooldown: 5
    });
  }

  async run(msg, [query]) {
    urban(query).first(async (json) => {
      if (json == undefined) return msg.sendMessage('🚫 **No Results Found!**');
      const embed = new this.client.embed()
        .setAuthor(`Urban Search - ${json.word}`, 'https://i.imgur.com/miYLsGw.jpg')
        .setColor('RANDOM')
        .addField('Definition', json.definition.length <= 1024 ? json.definition : `Truncated due to exceeding maximum length\n${json.definition.slice(0,970)}`, false)
        .addField('Example', json.example.length <= 1024 ? json.example : `Truncated due to exceeding maximum length\n${json.example.slice(0,970)}`, false)
        .addField('Permalink', json.permalink, false);
      await msg.sendEmbed(embed);
    });
  }
};
