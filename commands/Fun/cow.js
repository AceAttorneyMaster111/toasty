const { Command } = require('klasa');
const cows = require('cows');
const rn = require('random-number');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Sends a random ASCII cow.',
      cooldown: 2
    });
  }

  run(msg) {
    const options = {
      min: 0,
      max: cows().length - 1,
      integer: true
    };
    const random = rn(options);
    msg.channel.send(cows()[random], { code: ''});
  }
};
