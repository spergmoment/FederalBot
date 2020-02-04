exports.run = (msg, bot, args) => {
    if (bot.judgeToUse && bot.detainer && bot.courtThing) {
        const Discord = require("discord.js");
        let free = function() {
            bot.courtThing.removeRole(msg.guild.roles.find(r => r.name === "Muted"));
        };
        const guilty = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        if (msg.channel.parent === "court") {
            if (msg.member.user.id === bot.judgeToUse.user.id) { // makes sure it's used in court by the selected judge
                if (args.length > 1) {
                    bot.courtThing.addRole(msg.guild.roles.find(r => r.name === "Muted"));
                    guilty.setDescription(msg.member.displayName + ", " + bot.courtThing.displayName + " has been found **GUILTY.** If a time other than 0 has been put on a crime not punishable by imprisonment, you will be IMPEACHED!"); // you will
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
                        }, ],
                    });
                    setTimeout(free, (args[0] * 3600000));
                    bot.logEmbed.setTitle("Action: Rule case as Guilty");
                    bot.logEmbed.setDescription("Perpetrator: " + msg.member.displayName);
                    bot.logs.send(bot.logEmbed);
                } else if (args.length === 0) {
                    guilty.setDescription(msg.member.displayName + ", please provide a reason.");
                    guilty.setFooter('No reason found.');
                } else {
                    guilty.setDescription(msg.member.displayName + ", please set a time of imprisonment. If this crime is for a 1st-3rd misdemeanor, please put `0`.");
                    guilty.setFooter('No imprisonment time specified.');
                }
            }
        } else {
            guilty.setDescription(msg.member.displayName + ", this command may only be used in a court case.");
            guilty.setFooter('Category ' + msg.channel.parent + ' does not match category "court"');
        }
        msg.channel.send(guilty);
    }
};
