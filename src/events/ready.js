module.exports = (bot) => {
    const Discord = require("discord.js");
    const wait = require('util')
        .promisify(setTimeout);
    bot.invites = [];
    wait(1000);
    bot.user.setActivity('with your feelings');
    bot.guilds.forEach(g => {
        g.fetchInvites()
            .then(guildInvites => {
                bot.invites[g.id] = guildInvites;
            });
    });
};
