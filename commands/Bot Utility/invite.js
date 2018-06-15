const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Sends the invite URL so that you can add me to your server.',
      aliases: ['oauth'],
      guarded: true
    });
  }

  run(msg) {
    msg.reply(`You can invite me to your server with the link below!\n**https://toastybot.com/invite**`);
  }
};
