module.exports = {
    name: 'innocent',
    desc: 'For the judge of a case to rule the defendant `not guilty`, or otherwise `innocent`.',
    usage: ';innocent (reason)',
    examples: ";innocent \"The defendant, nigward, just happens to be a friend of Sperg's. " + 
    "Interrogations from other members have shown that nigward is a classic member of the server, " +
    "and has been consistently active for a while.\" // \"nigward#6969\" " + 
    "is ruled `innocent`, and the case is closed.",
    aliases: ['inno', 'not-guilty', 'notguilty'],
    execute(msg, bot, args) {
        if (bot.judgeToUse && bot.detainer && bot.courtThing) {
            const Discord = require("discord.js");
            const inno = new Discord.RichEmbed()
                .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
                .setTimestamp()
                .setColor("RANDOM");
            if (msg.channel.parent.name !== "court") 
                return msg.channel.send("Please use this in a valid court case.");
            if (msg.member.user.id !== bot.judgeToUse.user.id) 
                return msg.channel.send("You must be the judge of a case to use this command.");
            if (args.length === 0) 
                return msg.channel.send("Please provide a reason.");
            msg.channel.send("Ruling case as innocent...")
                .then(m => {
                    inno.setDescription(`${msg.member.displayName}, ` +
                                        `${bot.courtThing.displayName} has been found **INNOCENT.**`)
                        .setFooter('Ruled this case as innocent.');
                    msg.channel.send(inno);
                    bot.courtThing.removeRole(msg.guild.roles.find(r => r.name === "Court"));
                    var cj = msg.guild.roles.find(r => r.name === "Chief Justice");
                    var cp = msg.guild.roles.find(r => r.name === "Chief of Police");
                    msg.channel.replacePermissionOverwrites({
                        overwrites: [{
                            id: cj.id,
                            deny: ['SEND_MESSAGES'],
                        }, {
                            id: cp.id,
                            deny: ['SEND_MESSAGES'],
                        }, {
                            id: bot.detainer.id,
                            deny: ['SEND_MESSAGES'],
                        }, {
                            id: bot.judgeToUse.user.id,
                            deny: ['SEND_MESSAGES'],
                        }, {
                            id: bot.courtThing.user.id,
                            deny: ['SEND_MESSAGES'],
                        }, {
                            id: msg.guild.defaultRole.id,
                            deny: ["SEND_MESSAGES"],
                        }, ],
                    });
                    bot.logEmbed.setTitle("Rule case as Innocent")
                        .addField("Perpetrator", msg.member.user.tag)
                        .addField("Defendant", bot.courtThing.user.tag)
                        .addField("Reason", args.slice(0));
                    bot.logs.send(bot.logEmbed);
                    bot.courtThing = "";
                });
        }
    }
};
