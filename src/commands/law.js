exports.run = (msg, bot, args) => {
    if (args[0] > bot.laws.length || args[0] < 1) return msg.channel.send("That is not a valid law!");
    msg.channel.send("Fetching law " + args[0] + "...")
        .then(m => {
            const Discord = require("discord.js");
            var lawThing = (bot.laws[args[0] - 1]);
            const lawSend = new Discord.RichEmbed()
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(lawThing)
                .setFooter('Law ' + args[0]);
            msg.channel.send(lawSend);
            m.delete();
        });
};
