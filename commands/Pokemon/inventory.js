const { Command } = require('klasa');
const { util } = require('discord.js-commando');
const { stripIndents } = require('common-tags');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: msg => msg.language.get('INVENTORY_CMD_DESCRIPTION'),
      runIn: ['text'],
      aliases: ['inv'],
      usage: '[user:username]',
      cooldown: 5
    });
  }

  async run(msg, [user = msg.author]) {
    /*if (!msg.guild.me.permissions.has('ADD_REACTIONS')) return msg.reply(':no_entry_sign: [**Missing Permissions**]: I don\'t have the **Add Reactions** permission!');
    if (!msg.guild.me.permissions.has('EMBED_LINKS')) return msg.reply(':no_entry_sign: [**Missing Permissions**]: I don\'t have the **Embed Links** permission!');*/
    const { embed: RichEmbed } = this.client;
    let inventory = await this.client.pokemon.getInventory(user.id);
    if (!inventory.length) {
      if (user.id === msg.author.id) msg.reply(msg.language.get('INVENTORY_CMD_DONTHAVE'));
      else msg.reply(msg.language.get('INVENTORY_CMD_DOESNTHAVE'));
      return;
    }

    if (user.username.includes('(')) user.username = user.username.replace('(', '');
    if (user.username.includes(')')) user.username = user.username.replace(')', '');
    const invURL = `http://toastybot.com/inventory?id=${user.id}&name=${user.username.replace(/\s/g, '%20')}&avatar=${user.avatarURL()}`;

    inventory = inventory.map(item => `**${item.name}** x${item.count}`);
    const paginatedItems = util.paginate(inventory, 1, 25);

    let current = 1;
    const max = Math.ceil(inventory.length / 25);

    const mesg = await msg.sendMessage(stripIndents`
      __**${user.username}'s Pokemon:**__ ${msg.language.get('INVENTORY_CMD_INCLUDES')} **${inventory.length}/802** Pokemon. [Page 1 (25 shown)]
      ${paginatedItems.items.join('\n')}
    `, { embed: new RichEmbed().setDescription(`${msg.language.get('INVENTORY_CMD_ONLINEMSG')}(${invURL})**`) });

    if (msg.guild && msg.guild.me.permissions.has('ADD_REACTIONS')) {
      await Promise.all([
        await mesg.react('⬅'),
        await mesg.react('➡'),
        await mesg.react('❌')
      ]).catch(() => msg.sendMessage(msg.language.get('INVENTORY_CMD_REACTMSG')));
    } else if (!msg.guild) {
      await Promise.all([
        await mesg.react('⬅'),
        await mesg.react('➡'),
        await mesg.react('❌')
      ]).catch(() => msg.sendMessage(msg.language.get('INVENTORY_CMD_REACTMSG')));
    } else {
      msg.sendMessage(msg.language.get('INVENTORY_CMD_REACTMSG'));
    }

    const filter = (reaction, _user) => (reaction.emoji.name === '⬅' || reaction.emoji.name === '➡' || reaction.emoji.name === '❌') && _user.id === msg.author.id;

    const collector = mesg.createReactionCollector(filter, { time: 180e3 });
    collector.on('collect', async reaction => {
      if (reaction.emoji.name === '⬅') {
        if (current === 1) {
          await msg.reply(msg.language.get('INVENTORY_CMD_PAGEMSG'));
        } else {
          current -= 1;
          await mesg.edit(stripIndents`
            __**${user.username}'s Pokemon:**__ ${msg.language.get('INVENTORY_CMD_INCLUDES')} **${inventory.length}/802** Pokemon. [Page 1 (25 shown)]
            ${util.paginate(inventory, current, 25).items.join('\n')}
          `, { embed: new RichEmbed().setDescription(`${msg.language.get('INVENTORY_CMD_ONLINEMSG')}(${invURL})**`) });
        }
      } else if (reaction.emoji.name === '➡') {
        if (current >= max) {
          await msg.reply(msg.language.get('INVENTORY_CMD_PAGEMSG'));
        } else {
          current += 1;
          await mesg.edit(stripIndents`
            __**${user.username}'s Pokemon:**__ ${msg.language.get('INVENTORY_CMD_INCLUDES')} **${inventory.length}/802** Pokemon. [Page 1 (25 shown)]
            ${util.paginate(inventory, current, 25).items.join('\n')}
          `, { embed: new RichEmbed().setDescription(`${msg.language.get('INVENTORY_CMD_ONLINEMSG')}(${invURL})**`) });
        }
      } else if (reaction.emoji.name === '❌') {
        collector.stop('user');
        mesg.edit('', { embed: null });
        mesg.edit(`${this.client.redCheck} ${msg.language.get('INVENTORY_CMD_ENDEDMSG')}`);
      }
    });
  }
};
