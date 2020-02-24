exports.run = async (msg, bot, args) => {
    if (!msg.member.roles.find(r => r.name === "Judge") && !msg.member.roles.find(r => r.name === "Chief Justice")) {
        return msg.channel.send("You can not use this command!");
    }
    if (bot.reason) {
        const Discord = require("discord.js");
        bot.courtThing = msg.mentions.members.first();
        if (!bot.courtThing) {
            msg.channel.send("Who is being approved?");
            await msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
                max: 1,
                time: 30000,
                errors: ['time']
            })
                .then(async c => {
                    const f = c.first();
                    if (f.mentions.members.first()) {
                        bot.courtThing = f.mentions.members.first();
                    } else {
                        return msg.channel.send("Please mention a valid member.");
                    }
                })
                .catch(() => {
                    return msg.channel.send("Time limit reached, try again.");
                });
        }
        if (!bot.courtThing) return;
        let detained = msg.guild.roles.find(r => r.name === "Detained"); // do they have the detained role?
        const approve = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor("RANDOM");
        if (bot.courtThing.roles.find(r => r.name === "Detained")) { // checks for detainment
            msg.channel.send("Approving detainment on " + bot.courtThing.displayName + "...")
                .then(m => {
                    bot.courtThing.removeRole(detained) // detained role is gone!
                        .catch(console.error);
                    const sender = msg.member;
                    bot.courtThing.addRole(msg.guild.roles.find(r => r.name === "Court")); // but you're in court now
                    approve.setDescription(sender.displayName + ", " + bot.courtThing.displayName + " has been PUT IN COURT.")
                    .setFooter('Put ' + bot.courtThing.displayName + ' in court.');
                    msg.channel.send(approve);
                    var judgesStuff = []; // blank array
                    msg.guild.fetchMembers();
                    msg.guild.members.forEach(member => {
                        if (member.roles.find(r => r.name === "Judge")) {
                            if (member !== bot.courtThing && member !== msg.member) {
                                judgesStuff.push(member); // puts the member in the array if they're a judge, aren't the detained person, and aren't the approver
                            } else {
                                console.log(member.displayName, bot.courtThing.displayName);
                            }
                        }
                    });
                    bot.judgeToUse = judgesStuff[Math.floor(Math.random() * judgesStuff.length)]; // chooses a random judge
                    var cj = msg.guild.roles.find(r => r.name === "Chief Justice");
                    var cp = msg.guild.roles.find(r => r.name === "Chief of Police");
                    msg.guild.createChannel(bot.detainer.displayName + "-vs-" + bot.courtThing.displayName, {
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
                            id: bot.detainer.id,
                            allow: ['SEND_MESSAGES'],
                        }, {
                            id: bot.judgeToUse.user.id,
                            allow: ['SEND_MESSAGES'],
                        }, {
                            id: bot.courtThing.user.id,
                            allow: ['SEND_MESSAGES'],
                        },],
                    })
                        .then(async channel => {
                            var lawChannel = msg.guild.channels.find(c => c.name === "laws");
                            var rightChannel = msg.guild.channels.find(c => c.name === "rights");
                            var interChannel = msg.guild.channels.find(c => c.name === "interpretation");
                            let category = msg.guild.channels.find(c => c.name == "court" && c.type == "category");
                            if (!category) {
                                throw new Error("Category channel does not exist");
                            }
                            await channel.setParent(category.id);
                            var thing = "**Court Case:** \n\n" + bot.detainer + " vs. " + bot.courtThing.user +
                                ". Reason for court case: " + bot.reason + "\n\n";
                            if (bot.evidence) thing += `Evidence: ${bot.evidence}`;
                            var lawChannel = msg.guild.channels.find(c => c.name === "laws");
                            var rightChannel = msg.guild.channels.find(c => c.name === "rights");
                            var interChannel = msg.guild.channels.find(c => c.name === "interpretation");
                            await channel.setParent(category.id);
                            thing += (`${bot.judgeToUse.user} will be looking over this case.\n\n${bot.judgeToUse.displayName}` +
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
                            bot.logEmbed.setTitle("Approve Detainment")
                                .addField("User", bot.courtThing.tag)
                                .addField("Perpetrator", msg.member.tag);
                            await bot.logs.send(bot.logEmbed);
                            console.log(channel.name);
                        })
                        .catch(console.error);
                    m.delete();
                });
        } else {
            approve.setDescription("This user is not detained.")
            .setFooter('User ' + bot.courtThing.displayName + ' does not have the role "Detained"');
            msg.channel.send(approve); // this took so long to get to work im so proud of myself ahadgjasbh

        }
    }
};
