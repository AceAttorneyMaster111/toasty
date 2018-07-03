const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Get YouTube channel stats.',
      aliases: ['yt'],
      usage: '<channel:string>',
      cooldown: 5
    });
  }

  async run(msg, [channel]) {
    const snippet = await this.client.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${channel}&key=${this.client.config.tokens.youtube}&maxResults=1&type=channel`)
      .catch(e => msg.reply(`🚫 Your channel was too powerful that I couldn't handle it, try again! Error: ${e}`));
    const data = await this.client.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${snippet.body.items[0].id.channelId}&key=${this.client.config.tokens.youtube}`)
      .catch(e => msg.reply(`🚫 Your channel was too powerful that I couldn't handle it, try again! Error: ${e}`));

    const sData = snippet.body.items[0];
    const dData = data.body.items[0];

    const embed = new this.client.embed()
      .setColor('#FE0000')
      .setAuthor('YouTube Channel Stats', 'https://i.imgur.com/0D8AfVx.png')
      .setThumbnail(sData.snippet.thumbnails.high.url)
      .setDescription([
        `**Channel Name:** ${sData.snippet.channelTitle}`,
        `**Channel Description:** ${sData.snippet.description}\n`,
        `**Subscriber Count:** ${parseInt(dData.statistics.subscriberCount).toLocaleString()}`,
        `**Total Views:** ${parseInt(dData.statistics.viewCount).toLocaleString()}`,
        `**Total Videos:** ${parseInt(dData.statistics.videoCount).toLocaleString()}`,
        `**Channel Created:** ${new Date(sData.snippet.publishedAt).toDateString()}\n`,
        `**Link:** [YouTube.com/${sData.snippet.channelTitle}](https://www.youtube.com/channel/${sData.id.channelId})`
      ]);
    msg.sendEmbed(embed);
  }
};
