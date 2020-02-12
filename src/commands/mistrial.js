exports.run = (msg, bot, args) => {
    if (bot.judgeToUse && bot.detainer && bot.courtThing) {
        const Discord = require("discord.js");
        const mis = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor("RANDOM");
        if (msg.channel.parent.name === "court") {
            if (msg.member.user.id === bot.judgeToUse.user.id) {
                mis.setDescription(msg.member.displayName + ", you have declared this case as a MISTRIAL.");
                mis.setFooter('Case declared a mistrial');
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
                bot.logEmbed.setTitle("Action: Rule case as a Mistrial");
                bot.logEmbed.setDescription("Perpetrator: " + msg.member.displayName);
                bot.logs.send(bot.logEmbed);
            }
        } else {
            mis.setDescription(msg.member.displayName + ", this command may only be used in a court case.");
            mis.setFooter('Category ' + msg.channel.parent.name + ' does not match category "court".');
            msg.channel.send(mis);
        }
    }
};
