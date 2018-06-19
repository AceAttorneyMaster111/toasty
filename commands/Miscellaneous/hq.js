const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Sends the invite to my support server / HQ.'
    });
  }

  run(msg) {
    msg.sendMessage(`📬 **${msg.author.username}**, check your DM's!`);
    msg.author.send('**Join Toasty HQ with these invites!**\nhttps://discord.gg/sKCDdfp\nhttps://toastybot.com/hq');
  }
};
