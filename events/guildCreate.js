const { Event } = require('klasa');
const { post } = require('snekfetch');

module.exports = class extends Event {

  async run(guild) {
    //this.client.session.guilds++;
    const guildRes = await this.client.shard.fetchClientValues('guilds.size');
    const guilds = guildRes.reduce((prev, val) => prev + val, 0);
    this.client.user.setActivity(`;help | ${guilds.toLocaleString()} servers!`);

    /*post(`https://botlist.space/api/bots/${this.client.user.id}`)
      .set('Authorization', this.client.config.tokens.botlistspace)
      .send({
        server_count: guilds,
        shards: guildRes
      }).end();*/
  }

};
