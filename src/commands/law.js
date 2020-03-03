module.exports = {
    name: 'law',
    desc: 'Display any of the 11 currently passed laws.',
    usage: ';law (law)',
    examples: ';law 2 // returns law 2, raiding.',
    execute(msg, bot, args) {
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
    }
};