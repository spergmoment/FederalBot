module.exports = {
    name: 'guilty',
    desc: 'For the judge of a case to rule the defendant `guilty`.',
    usage: ';guilty (reason) (prison sentence)',
    examples: ";guilty \"Proven to be Sperg's alt. " + 
    "Sperg already has another alt in the server, bug." + 
    "Law 3 states that you may only have one alt in the server at ANY time, thus breaking Law 3. " + 
    "Sperg and his other alt will be put on trial accordingly.\" 24h // Rules the case `guilty`, " + 
    "sentences \"nigward#6969\" to a 1 day prison sentence, and closes the case.",
    extraNotes: 'If a prison sentence is put on a 1st, 2nd, or 3rd misdemeanor, ' + 
    "you will be immediately impeached and the user will be freed.",
    execute(msg, bot, args) {
        if (bot.judgeToUse && bot.detainer && bot.courtThing) {
            const Discord = require("discord.js");
            const guilty = new Discord.RichEmbed()
                .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
                .setTimestamp()
                .setColor('RANDOM');
            if (msg.channel.parent.name !== "court") 
                return msg.channel.send("Please use this in a valid court case.");
            if (msg.member.user.id !== bot.judgeToUse.user.id) 
                return msg.channel.send("You must be the judge of a case to use this command.");
            // makes sure it's used in court by the selected judge
            if (args.length === 0) 
                return msg.channel.send("Please provide a reason.");
            msg.channel.send("Ruling case as guilty...")
                .then(m => {
                    bot.courtThing.addRole(msg.guild.roles.find(r => r.name === "Muted"))
                        .removeRole(msg.guild.roles.find(r => r.name === "Court"));
                    guilty.setDescription(`${msg.member.displayName}, ` +
                                          `${bot.courtThing.displayName} has been found **GUILTY.**`)
                        .setFooter('Ruled the case as guilty.');
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
                    setTimeout(() => {
                        bot.courtThing.removeRole(msg.guild.roles.find(r => r.name === "Muted"));
                        console.log(parseInt(args[1], 10));
                    }, (parseInt(args[1], 10) * 60 * 60 * 1000));
                    bot.logEmbed.setTitle("Rule case as Guilty")
                        .addField("Perpetrator", msg.member.user.tag)
                        .addField("Defendant", bot.courtThing.user.tag)
                        .addField("Reason", args.slice(0, args.length - 1));
                    bot.logs.send(bot.logEmbed);
                    m.delete();
                });
        }
    }
};
