module.exports = {
    name: 'detain',
    desc: "For Officers to detain someone who has broken the law. " + 
    "A Judge must `;approve` the detainment within 5 minutes," + 
    " where they will be promptly sent to court. If no judge approves it, " + 
    "the Officer is impeached!",
    usage: ';detain (member) (law broken) (evidence)',
    examples: ";detain @nigward#6969 3 (evidence) // Detains member \"nigward#6969\", " + 
    "which can be approved by a Judge.",
    async execute(msg, bot, args) {
        const Discord = require("discord.js");
        let member = msg.mentions.members.first();
        bot.evidence = args.slice(2);
        if (!msg.member.roles.find(r => r.name === "Officer") && 
            !msg.member.roles.find(r => r.name === "Chief of Police")) {
            return msg.channel.send("You can not use this command!");
        }
        if (!member) {
            msg.channel.send("Who are you detaining?");
            await msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
                    max: 1,
                    time: 30000,
                    errors: ['time']
                })
                .then(async c => {
                    const f = c.first();
                    const m = f.mentions.members.first();
                    if (m) {
                        member = m;
                    } else {
                        return msg.channel.send("That member does not exist.");
                    }
                })
                .catch(err => {
                    return msg.channel.send("Time limit reached, try again.");
                });
        }
        if (!args[1] || parseInt(args[1], 10) >= bot.laws.length || parseInt(args[1], 10) < 1) {
            if (!member) return;
            msg.channel.send("Which law did they break?");
            await msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
                    max: 1,
                    time: 30000,
                    errors: ['time']
                })
                .then(async c => {
                    const f = c.first();
                    if (parseInt(f.content, 10) && parseInt(f.content, 10) < 10) {
                        bot.reason = f.content;
                    } else {
                        return msg.channel.send("Please use a valid law.");
                    }
                })
                .catch(() => {
                    return msg.channel.send("Time limit reached, try again");
                });
        } else {
            bot.reason = args[1];
        }
        if (args.length < 3) {
            if (!bot.reason) return;
            msg.channel.send("Please provide evidence.");
            await msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
                    max: 1,
                    time: 30000,
                    errors: ['time']
                })
                .then(async c => {
                    const f = c.first();
                    if (f.content.toLowerCase()
                        .startsWith("https")) {
                        bot.evidence = f.content;
                    } else {
                        return msg.channel.send("Invalid evidence.");
                    }
                })
                .catch(e => {
                    return msg.channel.send("Time limit reached, try again");
                });
        }
        if (!member || !bot.reason || !bot.evidence) return;
        msg.channel.send(`Detaining ${member.displayName}...`)
            .then(m => {
                const det = new Discord.RichEmbed()
                    .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
                    .setTimestamp()
                    .setColor('RANDOM');
                bot.detainer = msg.member;
                let role = msg.guild.roles.find(r => r.name === "Detained");
                det.setDescription(`${msg.member.displayName}, I have detained ${member.displayName}` + 
                                   `, for reason ${bot.reason}, with evidence ${bot.evidence}. ` + 
                                   `A judge must **;approve** this detain within **5 minutes** ` +
                                   `or you will be IMPEACHED!`)
                    .setFooter(`User ${member.displayName} has been detained.`);
                    console.log(bot.logsEmbed);
                bot.logEmbed
                    .setTitle("Detain")
                    .addField("User", member.user.tag)
                    .addField("Perpetrator", msg.author.tag)
                    .addField("Reason", bot.reason)
                    .addField("Evidence", bot.evidence);
                bot.logs.send(bot.logEmbed);
                member.addRole(role) // the good stuff starts now..
                    .catch(console.error);
                setTimeout(
                    () => {
                        if (!member.roles.find(r => r.name === "Court")) { 
                            // checks if the detainment was approved by a judge or not
                            msg.member.removeRole(msg.guild.roles.find(r => r.name === "Officer"))
                                .catch(console.error);
                            member.removeRole(role)
                                .catch(console.error);
                            det.setDescription(`${msg.member.displayName}, you have been impeached` + 
                                               ` because no judges approved this detainment in the 5 minutes.")
                                .setFooter('Impeached from Officer.');
                        }
                    }, 300000); // waits 5 minutes to check whether they have been approved, 
                                // does nothing if it has but impeaches you if it hasn't
                msg.channel.send(det);
                m.delete();
            });
    }
};
