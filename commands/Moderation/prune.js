const { Command } = require('klasa');
const { caseNumber } = require('../../utils/caseNumber.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['purge'],
      description: 'Deletes the specified messages..',
      extendedHelp: `Deletes messages. Here is a list of filters:
        __invites:__ Messages containing an invite
        __user @user:__ Messages sent by @user
        __bots:__ Messages sent by bots
        __uploads:__ Messages containing an attachment
        __links:__ Messages containing a link
        **Example Usage:** \`;prune 50\`, \`;prune 50 uploads\`, \`;prune 100 user @user\`
        `,
      runIn: ['text'],
      cooldown: 10,
      usage: '<limit:integer{1,100}> [filter:string] [user:username]',
      usageDelim: ' '
    });
  }

  async run(msg, [limit, filter, user]) {
    const lim = limit === 100 ? 99 : limit;
    const filter = filter.toLowerCase();
    let messageFilter;

    if (filter) {
      if (filter === 'invites') {
        messageFilter = message => message.content.search(/(discord\.gg\/.+|discordapp\.com\/invite\/.+)/i) !== -1;
      } else if (filter === 'user') {
        if (user) {
          messageFilter = message => message.author.id === user.id;
        } else {
          return msg.reply('🚫 You need to mention someone.');
        }
      } else if (filter === 'bots') {
        messageFilter = message => message.author.bot;
      } else if (filter === 'you') {
        messageFilter = message => message.author.id === message.client.user.id;
      } else if (filter === 'uploads') {
        messageFilter = message => message.attachments.size !== 0;
      } else if (filter === 'links') {
        messageFilter = message => message.content.search(/https?:\/\/[^ \/\.]+\.[^ \/\.]+/) !== -1;
      } else {
        return msg.reply(`🚫 That's not a valid filter. Type, \`${msg.guildConfigs.prefix}help prune\` for a list of filters.`);
      }
    }

    if (!filter) {
      const messagesToDelete = await msg.channel.messages.fetch({ lim: lim + 1 }).catch(() => null);
      msg.channel.bulkDelete(messagesToDelete.array().reverse()).catch(() => null);
      return null;
    } else {
      const messages = await msg.channel.messages.fetch({ lim: lim + 1 }).catch(() => null);
      const messagesToDelete = messages.filter(messageFilter);
      msg.channel.bulkDelete(messagesToDelete.array().reverse()).catch(() => null);
      return null;
    }
  }
};
