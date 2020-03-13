module.exports = {
    name: 'guilty',
    desc: 'For the judge of a case to rule the defendant `guilty`.',
    usage: ';guilty (reason) (prison sentence)',
    examples: ";guilty \"Proven to be Sperg's alt. " + "Sperg already has another alt in the server, bug." + "Law 3 states that you may only have one alt in the server at ANY time, thus breaking Law 3. " + "Sperg and his other alt will be put on trial accordingly.\" 24h // Rules the case `guilty`, " + "sentences \"nigward#6969\" to a 1 day prison sentence, and closes the case.",
    execute(msg, bot, args) {
        if (bot.judgeToUse && bot.detainer && bot.courtThing) {
            var send = `${msg.member.displayName}, ${bot.courtThing.displayName} has been found **GUILTY.**`;
            var num = args[args.length - 1];
            const Discord = require("discord.js");
            const guilty = new Discord.RichEmbed().setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL).setTimestamp().setColor('RANDOM');
            if (msg.channel.parent.name !== "court") return msg.channel.send("Please use this in a valid court case.");
            if (msg.member.user.id !== bot.judgeToUse.user.id) return msg.channel.send("You must be the judge of a case to use this command.");
            // makes sure it's used in court by the selected judge
            if (args.length === 0) return msg.channel.send("Please provide a reason.");
            msg.channel.send("Ruling case as guilty...").then(async m => {
                if (bot.reason == 1 || bot.reason == 9 || bot.reason == 10 || bot.reason == 11) {
                    var mrmeanor = await bot.Misdemeanors.findOne({
                        where: {
                            name: bot.courtThing.id
                        }
                    });
                    if (!mrmeanor) {
                        mrmeanor = bot.Misdemeanors.create({
                            user: bot.courtThing.id,
                            username: bot.courtThing.user.username,
                            guild: msg.guild.id,
                            misdemeanors: 1,
                        });
                    } else {
                        mrmeanor.increment("misdemeanors");
                    }
                    send += ` and charged with a MISDEMEANOR. This is misdemeanor **${mrmeanor.misdemeanors}**.`;
                    if (mrmeanor.misdemeanors > 3) {
                        if (args[args.length - 1]) {
                            num = args[args.length - 1];
                            send += " They have also been charged with a FELONY.";
                        } else {
                            return msg.channel.send("Please give a time of imprisonment!");
                        }
                    }
                }
                bot.courtThing.addRole(msg.guild.roles.find(r => r.name === "Muted")).removeRole(msg.guild.roles.find(r => r.name === "Court"));
                guilty.setDescription(send).setFooter('Ruled the case as guilty.');
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
                                }, ],
                });
                if (bot.reason != 1 && bot.reason != 9 && bot.reason != 10 && bot.reason != 11) {
                    setTimeout(() => {
                        bot.courtThing.removeRole(msg.guild.roles.find(r => r.name === "Muted"));
                        console.log(parseInt(args[1], 10));
                    }, (parseInt(num, 10) * 60 * 60 * 1000));
                }
                bot.logEmbed.setTitle("Rule case as Guilty").addField("Perpetrator", msg.member.user.tag).addField("Defendant", bot.courtThing.user.tag).addField("Reason", args.slice(0, args.length - 1));
                bot.logs.send(bot.logEmbed);
                m.delete();
            });
        }
    }
};