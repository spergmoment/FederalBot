module.exports = {
    name: 'right',
    desc: 'Displays any of the 10 currently passed rights.',
    usage: 'right (right)',
    examples: ';right 1 // returns right 1, the freedom of speech.',
    execute(msg, bot, args) {
        if (args[0] > 10 || args[0] < 1) return msg.channel.send("That is not a valid right.");
        msg.channel.send("Fetching right " + args[0] + "...")
            .then(m => {
                const Discord = require("discord.js");
                var rightThing = (bot.rights[args[0] - 1]);
                const rightSend = new Discord.RichEmbed()
                    .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setDescription(rightThing)
                    .setFooter('Right ' + args[0]);
                msg.channel.send(rightSend);
                m.delete();
            });
    }
};