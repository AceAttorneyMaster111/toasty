const { Command } = require('klasa');
const path = require('path');
const roasts = require(path.join(__dirname, '..', '..', 'assets', 'json', 'roasts.json'));

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['insult'],
      description: 'Roasts/insults the mentioned user... or yourself.',
      usage: '[person:string]',
      cooldown: 2
    });
  }

  run(msg, [person = msg.author]) {
    if (thing.toLowerCase().includes('toasty') || thing.includes('<@208946659361554432>')) return msg.reply('🔥 Listen up you dumbass retard! I ain\'t gonna roast myself!');
    if (msg.content.toLowerCase().startsWith(`${this.client.commandPrefix}roastme`) || msg.content.toLowerCase().startsWith(`${this.client.commandPrefix}roast me`)) return msg.sendMessage(`**${msg.author.username}**, :fire: ${this.client.functions.randomArray(roasts)}`);
    msg.sendMessage(`**${thing}**, 🔥 ${this.client.functions.randomArray(roasts)}`);
  }
};
