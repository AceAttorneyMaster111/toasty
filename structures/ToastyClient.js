const { Client } = require('klasa');
const snekfetch = require('snekfetch');
const Database = require('./Database.js');
const Pokemon = require('./Pokemon.js');
const PermissionLevels = require('./PermissionLevels.js');
const config = require('../config.json');

class ToastyClient extends Client {
  constructor(options) {
    super({ ...options, PermissionLevels });
    // Database
    this.r = require('rethinkdbdash')({
      port: 28015,
      host: 'localhost'
    });
    this.database = new Database(this);
    this.pokemon = new Pokemon(this);

    // Functions
    this.get = snekfetch.get;
    this.randomFromArray = (arr) => {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    this.formatUptime = (ms) => {
      const moment = require('moment');
      require('moment-duration-format');
      return moment.duration(ms).format(' D [days], H [hrs], m [mins], s [secs]');
    }
    this.clean = (text) => {
      if (typeof(text) === 'string') return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
      else return text;
    }
    this.validURL = (str) => {
      const URLRegex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
      return URLRegex.test(str);
    }

    // Data
    this.config = config;
    this.embed = require('discord.js').MessageEmbed;
    this.donators = require('../assets/json/donators.json');
    this.staff = require('../assets/json/staff.json');
    this.redCheck = '<:red_check_mark:447576694845603840>';

    // Music
    this.lavalink = null;
    this.queue = new Map();
    this.getSongs = async (search) => {
      return snekfetch.get(`http://${config.nodes.host}/loadtracks`)
        .set('Authorization', config.nodes.password)
        .query('identifier', search)
        .then(res => res.body.length ? res.body : null)
        .catch(err => {
          console.error(err);
          return null;
        });
    }
  }
};

module.exports = ToastyClient;
