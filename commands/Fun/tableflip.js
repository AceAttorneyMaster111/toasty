const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Flips a table in the chat.',
      cooldown: 7
    });
  }

  async run(msg) {
    const m = await msg.sendMessage('┬─┬ノ( º _ ºノ)');
    setTimeout(() => { m.edit('(°-°)\\ ┬─┬'); }, 450);
    setTimeout(() => { m.edit('(╯°□°)╯    ]'); }, 950);
    setTimeout(() => { m.edit('(╯°□°)╯  ︵  ┻━┻'); }, 1250);
  }
};
