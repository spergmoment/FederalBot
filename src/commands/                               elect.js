exports.run = (msg, bot, args) => {
    const Discord = require("discord.js");
    const elect = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        if (args.length > 3) {
            let num = args[0]; // this saves some space too
            let pos = args[1];
            if (msg.member.roles.find(r => r.name === "President")) {
                let electTo = "Yo @everyone, it's election time. Vote here for the " + pos + ". Note: Using alts to vote is *not* allowed and will get you disqualified.";
                for (let i = 0; i < num; i++) {
                    electTo += ("\n\n" + (i + 1) + ": " + args[i + 2]); // basically the number of the candidate
                }
                msg.channel.send(electTo)
                    .then(async msg => {
                        try {
                            await msg.react("1️⃣"); // same with before
                            await msg.react("2️⃣");
                            if (num > 2) {
                                await msg.react("3️⃣");
                            }
                            if (num > 3) {
                                await msg.react("4️⃣");
                            }
                            if (num > 4) {
                                await msg.react("5️⃣");
                            }
                            if (num > 5) {
                                await msg.react("6️⃣");
                            }
                            if (num > 6) {
                                await msg.react("7️⃣");
                            }
                            if (num > 7) {
                                await msg.react("8️⃣");
                            }
                            if (num > 8) {
                                await msg.react("9️⃣");
                            } // without await, these got all jumbled up
                        } catch (error) {
                            console.log(error);
                        }
                    });
                bot.logEmbed.setTitle("Action: Create Election");
                bot.logEmbed.setDescription("Perpetrator: " + msg.member.displayName);
                bot.logs.send(bot.logEmbed);
            } else {
                elect.setDescription("You are unable to use this command.");
                elect.setFooter('You lack the President role in the Permissions Object.');
                msg.channel.send(elect);
            }
        } else {
            elect.setDescription("Not enough args. Please do `;help elect` and try again.");
            elect.setFooter('Not enough args have been found.');
            msg.channel.send(elect);
        }
};
