module.exports = {
    name: 'mistrial',
    desc: 'For the judge of a case to rule the case as a `mistrial`.',
    usage: ';mistrial',
    extraNotes: "A mistrial is for an accidental, or otherwise unlawful, " + 
                "incorrect, or overall wrong detainment.",
    execute(msg, bot, args) {
        if (bot.judgeToUse && bot.detainer && bot.courtThing) {
            const Discord = require("discord.js");
            const mis = new Discord.RichEmbed()
                .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
                .setTimestamp()
                .setColor("RANDOM");
            if (msg.channel.parent.name !== "court") 
                return msg.channel.send("Please use this in a valid court case.");
            if (msg.member.user.id !== bot.judgeToUse.user.id) 
                return msg.channel.send("You must be the judge of a case to use this command.");
            msg.channel.send("Marking this case as a mistrial...")
                .then(m => {
                    mis.setDescription(`${msg.member.displayName}, you have declared this case as a MISTRIAL.`)
                        .setFooter('Case declared a mistrial');
                    bot.courtThing.removeRole(msg.guild.roles.find(r => r.name === "Court"));
                    msg.channel.send(mis);
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
                    bot.logEmbed.setTitle("Rule case as a Mistrial")
                        .addField("Perpetrator", msg.member.user.tag)
                        .addField("Defendant", bot.courtThing.user.tag);
                    bot.logs.send(bot.logEmbed);
                    bot.courtThing = "";
                });
        }
    }
};
