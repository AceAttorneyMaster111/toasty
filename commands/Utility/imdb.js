const { Command } = require('klasa');
const request = require('request-promise');
const vm = require('vm');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Search for movies via IMDB.',
      usage: '<query:string>',
      cooldown: 15
    });
  }

  async run(msg, [query]) {
    try {
      const link = `http://sg.media-imdb.com/suggests/${query.charAt(0).toLowerCase()}/${query.toLowerCase().replace(' ', '_')}.json`;
      const m = await msg.sendMessage('*Searching...*');
      const movie = await request.get(link).catch(() => null);
      const name = `imdb$${query.toLowerCase().replace(' ', '_')}`;
      const jsonpSandbox = vm.createContext({ [name]: function parse(obj) { return obj; } });
      const info = vm.runInContext(movie, jsonpSandbox);
      const embed = new this.client.embed()
        .setAuthor(`Requested by ${msg.author.username}:`, msg.author.displayAvatarURL)
        .setDescription(`🎬 **[${info.d[0].l.replace('on IMDB', '')}](http://www.imdb.com/title/${info.d[0].id})**`)
        .setImage(info.d[1].i[0]);
      return m.edit({ embed });
    } catch (err) {
      msg.sendMessage('🚫 Sorry, it looks like IMDB doesn\'t have that movie ;/.');
    }
  }
};
