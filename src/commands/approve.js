exports.run = (msg, bot, args) => {
    if (bot.reason) {
        const Discord = require("discord.js");
        if (args.length > 0) {
            bot.courtThing = msg.mentions.members.first();
            let detained = msg.guild.roles.find(r => r.name === "Detained"); // do they have the detained role?
            const approve = new Discord.RichEmbed()
                .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
                .setTimestamp()
                .setColor("RANDOM");
            if (msg.member.roles.find(r => r.name === "Judge") || msg.member.roles.find(r => r.name === "Chief Justice")) { // are you a judge?
                if (bot.courtThing.roles.find(r => r.name === "Detained")) { // checks for detainment
                    bot.courtThing.removeRole(detained) // detained role is gone!
                        .catch(console.error);
                    const sender = msg.member;
                    bot.courtThing.addRole(msg.guild.roles.find(r => r.name === "Court")); // but you're in court now
                    approve.setDescription(sender.displayName + ", " + bot.courtThing.displayName + " has been PUT IN COURT.");
                    approve.setFooter('Put ' + bot.courtThing.displayName + ' in court.');
                    var judgesStuff = []; // blank array
                    msg.guild.fetchMembers()
                        .then(async members => {
                            members.forEach(member => {
                                if (member.roles.find(r => r.name === "Judge")) {
                                    if (member !== bot.courtThing && member !== msg.member) {
                                        judgesStuff.push(member); // puts the member in the array if they're a judge, aren't the detained person, and aren't the approver
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
                    }, ],
                        })
                        .then(async channel => {
                            let category = msg.guild.channels.find(c => c.name == "court" && c.type == "category");
                            if (!category) {
                                throw new Error("Category channel does not exist");
                            }
                            await channel.setParent(category.id);
                            await channel.send("**Court Case:** \n\n" + bot.detainer + " vs. " + bot.courtThing.user + ". Reason for court case: " + bot.reason + "\n\n" + bot.judgeToUse.user + " will be looking over this case. \n\n" + bot.judgeToUse.displayName + ", remember to read the laws, rights, and interpretations before delivering your verdict. And always remember, feel free to ping Sperg (AKA bug, HH, rend, white people, or stuff), the President, VP, CJ, or CP to get any help needed. \n\nNow, we don\'t have infinite time, **GET GOING!**")
                                .catch(console.error);
                            bot.logEmbed.setTitle("Action: Approve Detainment");
                            bot.logEmbed.setDescription("User: " + bot.courtThing.displayName + "\n\nPerpetrator: " + msg.member.displayName);
                            await bot.logs.send(bot.logEmbed);
                            console.log(channel.name);
                        })
                        .catch(console.error);
                } else {
                    approve.setDescription("This user is not detained.");
                    approve.setFooter('User ' + bot.courtThing.displayName + ' does not have the role "Detained"');
                }
            } else {
                approve.setDescription("You must be a Judge to use this command.");
                approve.setFooter('You lack the Judge role in the Permissions Object.');
            }
            msg.channel.send(approve); // this took so long to get to work im so proud of myself ahadgjasbh
        } else {
            const wait = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
                .setTimestamp()
                .setDescription("Who are you detaining?");
            msg.channel.send(wait);
            msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                })
                .then(async c => {
                    const f = c.first();
                    if (f.mentions.members.first()) {
                        bot.courtThing = f.mentions.members.first();
                        let detained = msg.guild.roles.find(r => r.name === "Detained"); // do they have the detained role?
                        const approve = new Discord.RichEmbed()
                            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
                            .setTimestamp()
                            .setColor("RANDOM");
                        if (msg.member.roles.find(r => r.name === "Judge") || msg.member.roles.find(r => r.name === "Chief Justice")) { // are you a judge?
                            if (bot.courtThing.roles.find(r => r.name === "Detained")) { // checks for detainment
                                bot.courtThing.removeRole(detained) // detained role is gone!
                                    .catch(console.error);
                                const sender = f.member;
                                bot.courtThing.addRole(msg.guild.roles.find(r => r.name === "Court")); // but you're in court now
                                approve.setDescription(sender.displayName + ", " + bot.courtThing.displayName + " has been PUT IN COURT.");
                                approve.setFooter('Put ' + bot.courtThing.displayName + ' in court.');
                                var judgesStuff = []; // blank array
                                msg.guild.fetchMembers()
                                    .then(async members => {
                                        members.forEach(member => {
                                            if (member.roles.find(r => r.name === "Judge")) {
                                                if (member !== bot.courtThing && member !== msg.member) {
                                                    judgesStuff.push(member); // puts the member in the array if they're a judge, aren't the detained person, and aren't the approver
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
                    }, ],
                                    })
                                    .then(async channel => {
                                        let category = msg.guild.channels.find(c => c.name == "court" && c.type == "category");
                                        if (!category) {
                                            throw new Error("Category channel does not exist");
                                        }
                                        await channel.setParent(category.id);
                                        await channel.send("**Court Case:** \n\n" + bot.detainer + " vs. " + bot.courtThing.user + ". Reason for court case: " + bot.reason + "\n\n" + bot.judgeToUse.user + " will be looking over this case. \n\n" + bot.judgeToUse.displayName + ", remember to read the laws, rights, and interpretations before delivering your verdict. And always remember, feel free to ping Sperg (AKA bug, HH, rend, white people, or stuff), the President, VP, CJ, or CP to get any help needed. \n\nNow, we don\'t have infinite time, **GET GOING!**")
                                            .catch(console.error);
                                        bot.logEmbed.setTitle("Action: Approve Detainment");
                                        bot.logEmbed.setDescription("User: " + bot.courtThing.displayName + "\n\nPerpetrator: " + msg.member.displayName);
                                        await bot.logs.send(bot.logEmbed);
                                        console.log(channel.name);
                                    })
                                    .catch(console.error);
                            } else {
                                approve.setDescription("This user is not detained.");
                                approve.setFooter('User ' + bot.courtThing.displayName + ' does not have the role "Detained"');
                            }
                        } else {
                            approve.setDescription("You must be a Judge to use this command.");
                            approve.setFooter('You lack the Judge role in the Permissions Object.');
                        }
                        msg.channel.send(approve); // this took so long to get to work im so proud of myself ahadgjasbh
                    }
                });
        }
    }
};
