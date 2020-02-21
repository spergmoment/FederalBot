exports.run = (msg, bot, args) => {
    if (!bot.reason || !bot.evidence) return;
    if (!msg.member.roles.find(r => r.name === "Officer") && !msg.member.roles.find(r => r.name)) {
        return msg.channel.send("You must be an Officer to use this command.");
    }
    bot.courtThing = msg.mentions.members.first();
    if (!bot.courtThing) {
        msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
                max: 1,
                time: 30000,
                errors: ['time']
            })
            .then(async c => {
                const f = c.first();
                const m = f.mentions.members.first();
                if (m) {
                    bot.courtThing = m;
                } else {
                    return msg.channel.send("That is not a valid member.");
                }
            })
            .catch(e => {
                return msg.channel.send("Time limit reached, try again.");
            });
    }
    if (!bot.courtThing.roles.find(r => r.name === "warrant")) return msg.channel.send("This user does not have a warrant on them.");
    msg.channel.send("Arresting " + bot.courtThing.displayName + "...")
        .then(m => {
            let warrant = msg.guild.roles.find(r => r.name === "warrant");
            bot.courtThing.removeRole(warrant);
            const sender = msg.member;
            bot.courtThing.addRole(msg.guild.roles.find(r => r.name === "Court")); // but you're in court now
            const Discord = require('discord.js');
            const a = new Discord.RichEmbed()
                .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
                .setTimestamp()
                .setColor("RANDOM")
                .setDescription(sender.displayName + ", " + bot.courtThing.displayName + " has been PUT IN COURT.")
                .setFooter('Put ' + bot.courtThing.displayName + ' in court.');
            var judgesStuff = []; // blank array
            msg.guild.fetchMembers()
                .then(async members => {
                    members.forEach(member => {
                        if (member.roles.find(r => r.name === "Judge")) {
                            if (member !== bot.courtThing) {
                                judgesStuff.push(member); // puts the member in the array if they're a judge, and aren't the detained person
                            } else {
                                console.log(member, bot.courtThing);
                            }
                        }
                    });
                });
            bot.judgeToUse = judgesStuff[Math.floor(Math.random() * judgesStuff.length)]; // chooses a random judge
            console.log(bot.judgeToUse.user.tag);
            var cj = msg.guild.roles.find(r => r.name === "Chief Justice");
            var cp = msg.guild.roles.find(r => r.name === "Chief of Police");
            msg.guild.createChannel(msg.member.displayName + "-vs-" + bot.courtThing.displayName, {
                    type: 'text',
                    permissionOverwrites: [{
                        id: msg.guild.defaultRole.id,
                        deny: ['SEND_MESSAGES'], // makes it so @everyone can't send stuff
                    }, {
                        id: cj.id,
                        allow: ['SEND_MESSAGES'],
                    }, {
                        id: cp.id,
                        allow: ['SEND_MESSAGES'],
                    }, {
                        id: msg.author.id,
                        allow: ['SEND_MESSAGES'],
                    }, {
                        id: bot.judgeToUse.user.id,
                        allow: ['SEND_MESSAGES'],
                    }, {
                        id: bot.courtThing.user.id,
                        allow: ['SEND_MESSAGES'],
                    }, ],
                })
                .then(async channel => {
                    let category = msg.guild.channels.find(c => c.name == "court" && c.type == "category");
                    if (!category) {
                        throw new Error("Category channel does not exist");
                    }
                var lawChannel = msg.guild.channels.find(c => c.name==="laws");
                            var rightChannel = msg.guild.channels.find(c => c.name==="rights");
                            var interChannel = msg.guild.channels.find(c => c.name==="interpretation");
                    await channel.setParent(category.id);
                            var thing = "**Court Case:** \n\n" + bot.detainer + " vs. " + bot.courtThing.user + 
                                ". Reason for court case: " + bot.reason + "\n\n";
                            if(bot.warrantEvidence) thing+=`Evidence: ${bot.evidence}`;
                            thing+=(`${bot.judgeToUse.user} will be looking over this case.\n\n${bot.judgeToUse.displayName}` + 
                                    ", please remember a few things before delivering your verdict:\n " +
                                    `1. Read the ${lawChannel}, ${rightChannel}, and ${interChannel}.\n` +
                                    "2. Listen to evidence from both sides. Do *NOT* take prejudice against the defendant or prosecutor.\n" +
                                    "3. Everything in this case is subjective. Please declare your verdicts before using the `;guilty` or `;innocent` commands.\n" +
                                    "4. feel free to ping Sperg (bug), the President, VP, CJ, or CP to get any help needed.\n\n" +
                                    `${bot.detainer.displayName}, please remember a few things:\n` +
                                    "1. Your opinion is your opinion. Don't try to sway the lawyer's opinion.\n" +
                                    "2. Never, EVER force the judge to adapt to your opinions.\n\n" +
                                    "And finally, for everyone, BE CIVIL!\n" +
                                    "\n\nNow, we don\'t have infinite time, **GET GOING!**");
                            channel.send(thing)
                                .catch(console.error);
                    bot.logEmbed.setTitle("Arrest Warrant")
                        .addField("User", bot.courtThing.displayName)
                        .addField("Perpetrator", msg.member.displayName);
                    await bot.logs.send(bot.logEmbed);
                    console.log(channel.name);
                })
                .catch(console.error);
            msg.channel.send(a);
            m.delete();
        });
};
