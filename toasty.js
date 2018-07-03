const ToastyClient = require('./structures/ToastyClient.js');
const config = require('./config.json');
const Raven = require('raven');
const { oneLine } = require('common-tags');

setupBot = () => {
  new ToastyClient({
    prefix: config.prefix,
    commandEditing: true,
    disabledEvents: [
      'GUILD_SYNC',
      'CHANNEL_PINS_UPDATE',
      'USER_NOTE_UPDATE',
      'RELATIONSHIP_ADD',
      'RELATIONSHIP_REMOVE',
      'USER_SETTINGS_UPDATE',
      'VOICE_STATE_UPDATE',
      'VOICE_SERVER_UPDATE',
      'TYPING_START',
      'PRESENCE_UPDATE'
    ],
    clientOptions: {
      fetchAllMembers: false
    },
    presence: { activity: { name: ';help | toasty.xyz' } },
    readyMessage: (client) => oneLine`Shard ${client.shard.id + 1}/${client.shard.count} ready!
      On ${client.guilds.size.toLocaleString()} guilds w/ ${client.users.size.toLocaleString()} users.`
  }).login(config.betaToken);
}

process.on('unhandledRejection', err => {
  console.log('Unhandled Rejection at:', err.stack || err);
  //Raven.captureException(err);
});

process.on('uncaughtException', err => {
  console.log('Uncaught Exception at:', err.stack || err);
  //Raven.captureException(err);
});

//Raven.config(config.tokens.raven).install();
//Raven.context(() => setupBot());
setupBot();
