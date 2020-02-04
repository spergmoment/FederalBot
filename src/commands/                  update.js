exports.run = (msg, bot, args) => {
    const Discord = require("discord.js")
    const update = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        if (msg.member.roles.find(r => r.name === "Bot Owner") || msg.member.roles.find(r => r.name === "Bot Admin")) {
            update.setTitle("New update:");
            if (args[0] === '1' || args[0] === '2' || args[0] === '3') {
                update.setDescription(updates[args[0] - 1]);
            } else {
                update.setDescription(args.join(" "));
            }
            update.setFooter('Bot update!');
        } else {
            update.setDescription("Only a bot owner or admin may use this command.");
            update.setFooter('You lack the Bot Owner and Bot Admin roles in the Permissions Object.');
        }
        msg.channel.send(update);
};
