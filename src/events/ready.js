module.exports = (bot) => {
const wait = require('util')
bot.invites = {};
    .promisify(setTimeout);
  bot.logsEmbed = new Discord.RichEmbed()
    .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
        .toString(16)
        .substr(1, 6))
    .setTimestamp()
    .setDescription("")
    .setTitle("");
    logsEmbed.fields=[];
    wait(1000);
    bot.user.setActivity('with your feelings');
    bot.guilds.forEach(g => {
        g.fetchInvites()
            .then(guildInvites => {
                bot.invites[g.id] = guildInvites;
            });
    });
};