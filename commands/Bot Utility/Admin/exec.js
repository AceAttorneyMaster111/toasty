const { Command } = require('klasa');
const { exec } = require('child_process');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Executes a command in the shell. [Bot developer Only]',
      usage: '<command:string>',
      permissionLevel: 9
    });
  }

  run(msg, [command]) {
    exec(command, (err, stdout, stderr) => {
      if (err) return msg.channel.send(err.message, { code: '' });
      return msg.channel.send(stdout, { code: '' });
    });
  }
};
