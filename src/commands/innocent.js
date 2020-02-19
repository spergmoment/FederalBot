exports.run = (msg, bot, args) => {
    if (bot.judgeToUse && bot.detainer && bot.courtThing) {
        const Discord = require("discord.js");
        const inno = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor("RANDOM");
        if (msg.channel.parent.name === "court") {
            if (msg.member.user.id === bot.judgeToUse.user.id) {
                if (args.length > 0) {
                    msg.channel.send("Ruling case as innocent...")
                        .then(m => {
                            inno.setDescription(msg.member.displayName + ", " + bot.courtThing.displayName + " has been found **INNOCENT.**");
                            inno.setFooter('Ruled this case as innocent.');
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
                                .addField("Perpetrator", msg.member.displayName)
                                .addField("Reason", args.slice(0, args.length - 1));
                            bot.logs.send(bot.logEmbed);
                            bot.courtThing = "";
                        });
                } else if (args.length === 0) {
                    inno.setDescription(msg.member.displayName + ", please provide a reason.");
                    inno.setFooter('Reason unspecified.');
                }
            }
        } else {
            inno.setDescription(msg.member.displayName + ", this command may only be used in a court case.");
            inno.setFooter('Category ' + msg.channel.parent.name + ' does not match category "court".');
        }
        msg.channel.send(inno);
    }
};
