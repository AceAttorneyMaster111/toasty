const { Command } = require('klasa');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      description: 'Get fortnite stats.',
      extendedHelp: '**Example Usage:** `;fortnite ninja pc`',
      usage: '<username:string> <platform:string> [...]',
      usageDelim: ' ',
      cooldown: 7
    });
  }

  async run(msg, [username, ...platform]) {
    try {
      const client = this.client;
      const name = username.join(' ');
      let data;
      if (platform.toLowerCase() === 'pc') {
        data = await client.get(`https://api.fortnitetracker.com/v1/profile/pc/${name}`)
          .set('TRN-Api-Key', client.config.tokens.fortnite);
        } else if (platform.toLowerCase() === 'xbox') {
          data = await client.get(`https://api.fortnitetracker.com/v1/profile/xb1/${name}`)
            .set('TRN-Api-Key', client.config.tokens.fortnite);
        } else if (platform.toLowerCase() === 'psn') {
          data = await client.get(`https://api.fortnitetracker.com/v1/profile/psn/${name}`)
            .set('TRN-Api-Key', client.config.tokens.fortnite);
        } else {
          return msg.sendMessage('🚫 **Error:** Invalid username or platform, please retry with either of these platforms: `pc`, `xbox`, `psn`');
        }

        const d = data.body;

        if (!data) return msg.sendMessage('🚫 **Error:** Invalid username or platform, please retry with either of these platforms: `pc`, `xbox`, `psn`');
        if (d.error) return msg.sendMessage('🚫 **Error:** There was an error with the Fortnite API. Please try again later.');

        const embed = new client.embed()
          .setTitle('Fortnite Battle Royale Stats')
          .setThumbnail('https://i.imgur.com/EER1jFB.png')
          .setColor('#151842')
          .setDescription([
            `**Username:** ${d.epicUserHandle}`,
            `**Score:** ${d.lifeTimeStats.find(a => a.key === 'Score').value}`,
            `**Matches Played:** ${d.lifeTimeStats.find(a => a.key === 'Matches Played').value}`,
            `**Kills:** ${d.lifeTimeStats.find(a => a.key === 'Kills').value}`,
            `**K/D:** ${d.lifeTimeStats.find(a => a.key === 'K/d').value}`,
            `**Wins:** ${d.lifeTimeStats.find(a => a.key === 'Wins').value}`,
            `**Top 3:** ${d.lifeTimeStats.find(a => a.key === 'Top 3').value}`,
            `**Platform:** ${d.platformNameLong}`
          ]);
        msg.sendEmbed(embed);
      } catch(err) {
        return msg.sendMessage('🚫 **Error:** There was an error with the Fortnite API. Please try again later.');
      }
  }
};
