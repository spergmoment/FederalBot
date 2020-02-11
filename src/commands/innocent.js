exports.run = (msg, bot, args) => {
        if (bot.judgeToUse && bot.detainer && bot.courtThing) {
            const Discord = require("discord.js");
            const inno = new Discord.RichEmbed()
                .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
                .setTimestamp()
                .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                    .toString(16)
                    .substr(1, 6));
            if (msg.channel.parent.name === "court") {
                if (msg.member.user.id === bot.judgeToUse.user.id) {
                    if (args.length > 0) {
                        inno.setDescription(msg.member.displayName + ", " + bot.courtThing.displayName + " has been found **INNOCENT.**");
                        inno.setFooter('Ruled this case as innocent.');
                        msg.channel.send(inno);
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
                        },],
                        });
                        bot.logEmbed.setTitle("Action: Rule case as Innocent");
                        bot.logEmbed.setDescription("Perpetrator: " + msg.member.displayName);
                        bot.logs.send(bot.logEmbed);
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
