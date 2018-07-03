const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Sends a list of avaliable news sources for the news command.',
    });
  }

  run(msg) {
    msg.sendMessage('Avaliable news sources for the news command are:\ncnn, time, the-verge, cnbc, nytimes, buzzfeed, washington-post, wsj, daily-mail, google, espn, reddit, bbc, associated-press, techradar, polygon, hacker-news, mashable, and national-geographic');
  }
};
