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
    this.functions = require('../utils/functions.js');

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
