const { Client } = require('klasa');
const config = require('./config');

new Client({
  clientOptions: {
    fetchAllMembers: false
  },
  prefix: config.prefix,
  cmdEditing: true,
  typing: true,
  readyMessage: (client) => `${client.user.tag}, Ready to serve ${client.guilds.size} guilds and ${client.users.size} users`
}).login(config.betaToken);
