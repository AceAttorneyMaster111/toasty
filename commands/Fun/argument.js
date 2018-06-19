const { Command } = require('klasa');
const path = require('path');
const fs = require('fs');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Sends a topic that will start and argument.'
    });
  }

  run(msg) {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'assets', 'json', 'arguments.json')));
    msg.sendMessage(this.client.randomFromArray(data));
  }
};
