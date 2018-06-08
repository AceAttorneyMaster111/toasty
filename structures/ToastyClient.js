const { Client } = require('klasa');
const { MessageEmbed } = require('discord.js');
const r = require('rethinkdbdash')({
  port: 28015,
  host: 'localhost'
});
const Database = require('./Database.js');
const Pokemon = require('./Pokemon.js');

class ToastyClient extends Client {
  constructor(options) {
    super(options);
    this.r = r;
    this.embed = MessageEmbed;
    this.config = require('../config.json');
    this.snekfetch = require('snekfetch');
    /*this.donators = require('../assets/json/donators.json');
    this.staff = require('../assets/json/staff.json');*/
    this.randomFromArray = (array) => {
      return array[Math.floor(Math.random() * array.length)];
    };
    this.formatUptime = (ms) => {
      const moment = require('moment');
      require('moment-duration-format');
      return moment.duration(ms).format(' D [days], H [hrs], m [mins], s [secs]');
    };
    this.database = new Database(this);
    this.pokemon = new Pokemon(this);
  }
}

module.exports = ToastyClient;
