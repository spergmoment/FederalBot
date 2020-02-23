exports.run = (msg, bot, args) => {
    if (bot.judgeToUse && bot.detainer && bot.courtThing) {
        const Discord = require("discord.js");
        const guilty = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('RANDOM');
        if (msg.channel.parent.name === "court") {
            if (msg.member.user.id === bot.judgeToUse.user.id) { // makes sure it's used in court by the selected judge
                if (args.length > 1 && bot.reason !== 1 && bot.reason !== 9) {
                    msg.channel.send("Ruling case as guilty...")
                        .then(m => {
                            bot.courtThing.addRole(msg.guild.roles.find(r => r.name === "Muted"));
                            bot.courtThing.removeRole(msg.guild.roles.find(r => r.name === "Court"));
                            guilty.setDescription(msg.member.displayName + ", " + bot.courtThing.displayName + " has been found **GUILTY.**");
                            guilty.setFooter('Ruled the case as guilty.');
                            msg.channel.send(guilty);
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
                            setTimeout(() => { bot.courtThing.removeRole(msg.guild.roles.find(r => r.name === "Muted"));console.log(parseInt(args[1], 10)) }, (parseInt(args[1],10) * 60*60*1000));
                            bot.logEmbed.setTitle("Rule case as Guilty");
                            bot.logEmbed.addField("Perpetrator", msg.member.displayName)
                                .addField("Reason", args.slice(0, args.length - 1));
                            bot.logs.send(bot.logEmbed);
                            m.delete();
                        });

                } else if (args.length === 0) {
                    guilty.setDescription(msg.member.displayName + ", please provide a reason.");
                    guilty.setFooter('No reason found.');
                } else {
                    if (bot.reason !== 1 && bot.reason !== 9 && bot.courtThing.misdemeanors < 4) {
                        guilty.setDescription(msg.member.displayName + ", please set a time of imprisonment.");
                        guilty.setFooter('No imprisonment time specified.');
                    }
                }
            }
        } else {
            guilty.setDescription(msg.member.displayName + ", this command may only be used in a court case.");
            guilty.setFooter('Category ' + msg.channel.parent.name + ' does not match category "court"');
        }
    }
};
