exports.run = (msg, bot, args) => {
    const Discord = require("discord.js");
    let member = msg.mentions.members.first();
    bot.evidence=args.slice(2);
    if (!msg.member.roles.find(r => r.name === "Officer") && !msg.member.roles.find(r => r.name === "Chief of Police")) {
        return msg.channel.send("You can not use this command!");
    }
    if (!member) {
        msg.channel.send("Who are you detaining?");
        msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
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
    if (!args[1]) {
        msg.channel.send("Which law did they break?");
        msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
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
    if(args.length<3) {
       msg.channel.send("Please provide evidence.");
        msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
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
    msg.channel.send("Detaining " + member.displayName + "...").then(m => {
    const det = new Discord.RichEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
        .setTimestamp()
        .setColor('RANDOM');
    bot.detainer = msg.member;
    let role = msg.guild.roles.find(r => r.name === "Detained");
    det.setDescription(`${msg.member.displayName}, I have detained ${member.displayName}` + 
                       `, for reason ${args[1]}, with evidence ${bot.evidence}. A judge must **;approve** this detain within **5 minutes** or you will be IMPEACHED!`);
    /*the above was split in 2 to take up less space*/
    det.setFooter(`User ${member.displayName} has been detained.`);
    bot.logEmbed.setTitle("Detain")
    .addField("User", member.displayName)
    .addField("Perpetrator", msg.member.displayName)
    .addField("Reason", bot.reason);
    bot.logs.send(bot.logEmbed);
    member.addRole(role) // the good stuff starts now..
        .catch(console.error);
    setTimeout(
        () => {
            if (!member.roles.find(r => r.name === "Court")) { // checks if the detainment was approved by a judge or not
                msg.member.removeRole(msg.guild.roles.find(r => r.name === "Officer"))
                    .catch(console.error);
                member.removeRole(role)
                    .catch(console.error);
                det.setDescription(msg.member.displayName + ", you have been impeached because no judges approved this detainment in the 5 minutes.");
                det.setFooter('Impeached from Officer.');
            }
        }, 300000); // waits 5 minutes to check whether they have been approved, does nothing if it has but impeaches you if it hasn't
    msg.channel.send(det);
    m.delete();
});
};
