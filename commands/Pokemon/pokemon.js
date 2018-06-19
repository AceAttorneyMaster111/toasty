const { Command } = require('klasa');
const randomPokemon = require('pokemon-random');
const moment = require('moment');
require('moment-duration-format');
const { stripIndents, oneLine } = require('common-tags');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: msg => msg.language.get('POKEMON_CMD_DESCRIPTION'),
      extendedHelp: msg => msg.language.get('POKEMON_CMD_EXTENDEDHELP'),
      runIn: ['text']
    });
  }

  async run(msg) {
    const user = msg.author;
    if (msg.channel.id === '208674478773895168') return msg.reply('Pokemon commands must be used in <#303206425113657344>!');

    /* eslint-enable max-len */
    const received = await this.client.pokemon.hasReceived(user.id);
    if (received && user.id !== '266619835738357770') {
      const next = await this.client.pokemon.nextPokemon(user.id);
      return msg.sendMessage(oneLine`
        🚫 **${user.username}**,
        ${msg.languauge.get('POKEMON_CMD_COOLDOWNMSG_1')} **${moment.duration(next).format(' H [hours], m [minutes] & s [seconds]')}**
        ${msg.language.get('POKEMON_CMD_COOLDOWNMSG_2')}
      `);
    }

    const newPokemon = randomPokemon();

    if (!newPokemon || typeof newPokemon === 'undefined') return msg.reply(msg.language.get('POKEMON_CMD_CATCHFAILMSG'));

    //this.client.session.pokemon++;

    //const oldSprite = 'http://www.pokestadium.com/sprites/xy/';
    const spriteURL = 'https://play.pokemonshowdown.com/sprites/xyani/';
    const newName = newPokemon.toLowerCase().replace(/\W/g, '');

    await this.client.pokemon.addPokemon(newPokemon, user.id);
    const embed = new this.client.embed()
      .setDescription(`**${user.username}**, <:pokeball:440220815817048064> ${msg.language.get('POKEMON_CMD_CATCHMSG')} **${newPokemon}**!`)
      .setImage(`${spriteURL}${newName}.gif`)
    msg.sendEmbed(embed);

    /*msg.sendMessage(stripIndents`
      **${user.username}**, <:pokeball:440220815817048064> you've caught a **${newPokemon}**!
      ${newSprite}${newName}.gif
    `);*/
  }
};
