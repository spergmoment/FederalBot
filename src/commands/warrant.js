exports.run = (msg, bot, args) => {
    var member = msg.mentions.members.first();
    bot.reason = parseInt(args[1], 10);
    bot.evidence = args.slice(2);
    if (!msg.member.roles.find(r => r.name === "Judge") && !msg.member.roles.find(r => r.name === "Chief Justice")) {
        return msg.channel.send("You must be a Judge to use this command.");
    }
    if (!member) {
        msg.channel.send("Who do you want to grant a warrant for?");
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
                    return msg.channel.send("That is not a valid member.");
                }
            })
            .catch(e => {
                return msg.channel.send("Time limit reached, try again.");
            });
    }
    if (parseInt(args[1], 10) > 9) {
        msg.channel.send("What law was broken?");
        msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
                max: 1,
                time: 30000,
                errors: ['time']
            })
            .then(async c => {
                const f = c.first();
                const n = parseInt(f, 10);
                if (typeof n !== Number) return msg.channel.send("That is not a valid law.");
                bot.reason = parseInt(f, 10);
            })
            .catch(e => {
                return msg.channel.send("Time limit reached, try again");
            });
    }
    if (args.length < 3) {
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
    msg.channel.send("Granting warrant...")
        .then(m => {
            member.addRole(msg.guild.roles.find(r => r.name === "warrant"));
            const Discord = require('discord.js');
            const w = new Discord.RichEmbed()
                .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(msg.author.username + ", I have granted a warrant against " + member.user.username + ". An officer must **;arrest** this person for a case to take place.");
            msg.channel.send(w);
            bot.logEmbed.setTitle("Grant Warrant")
                .addField("User", member.displayName)
                .addField("Perpetrator", msg.member.displayName)
                .addField("Reason", bot.reason)
                .addField("Evidence", bot.evidence);
            bot.logs.send(bot.logEmbed);
            setTimeout(() => {
                if (member.roles.find(r => r.name === "warrant")) {
                    member.removeRole(msg.guild.roles.find(r => r.name === "warrant"));
                    msg.channel.send(msg.author + ", your warrant against " + member.user + " has not been arrested. The warrant is now gone.");
                }
                m.delete();
            });
        });
};
