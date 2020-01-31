const Discord = require("discord.js"); // calls discord.js
const bot = new Discord.Client(); // calls the discord client
const config = require("./config.json"); // calls the config
const invites = {};
const wait = require('util')
    .promisify(setTimeout);
    var logsEmbed;
bot.on("ready", () => {
  logsEmbed = new Discord.RichEmbed()
    .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
        .toString(16)
        .substr(1, 6))
    .setTimestamp()
    .setDescription("")
    .setTitle("");
    logsEmbed.fields=[];
    wait(1000);
    bot.user.setActivity('with your feelings');
    bot.guilds.forEach(g => {
        g.fetchInvites()
            .then(guildInvites => {
                invites[g.id] = guildInvites;
            });
    });
});
bot.on("channelCreate", async ch => {
      logsEmbed.setDescription("")
    .setTitle("");
    logsEmbed.fields=[];
    const logs = ch.guild.channels.find(r => r.name === ("logs"));
    if (logs) {
        logsEmbed.setTitle("Action: Create Channel")
            .addField("Channel Name", ch.name)
            .addField("IDs", "```Channel: " + ch.id + "```");
        logs.send(logsEmbed);
    }
});
bot.on("channelDelete", async ch => {
      logsEmbed.setDescription("")
    .setTitle("");
    logsEmbed.fields=[];
    const logs = ch.guild.channels.find(r => r.name === ("logs"));
    if (logs) {
        logsEmbed.setTitle("Action: Delete Channel")
            .addField("Channel Name", ch.name)
            .addField("IDs", "```Channel ID: " + ch.id + "```");
        logs.send(logsEmbed);
    }
});
bot.on("emojiCreate", async e => {
      logsEmbed.setDescription("")
    .setTitle("");
    logsEmbed.fields=[];
    const logs = e.guild.channels.find(r => r.name === ("logs"));
    if (logs) {
        logsEmbed.setTitle("Action: Create Emoji")
            .addField("Emoji Name", e.name)
            .addField("URL", e.url)
            .addField("IDs", "```Emoji ID: " + e.id + "```");
        logs.send(logsEmbed);
    }
});
bot.on("emojiDelete", async e => {
      logsEmbed.setDescription("")
    .setTitle("");
    logsEmbed.fields=[];
    const logs = e.guild.channels.find(r => r.name === ("logs"));
    if (logs) {
        logsEmbed.setTitle("Action: Delete Emoji")
            .addField("Emoji Name", e.name)
            .addField("URL", e.url)
            .addField("IDs", "```Emoji ID: " + e.id + "```");
        logs.send(logsEmbed);
    }
});
bot.on("guildBanRemove", (g, m) => {
      logsEmbed.setDescription("")
    .setTitle("");
    logsEmbed.fields=[];
    const logs = g.channels.find(r => r.name === ("logs"));
    if (logs) {
        logsEmbed.setTitle("Action: Ban")
            .addField("Banned User", m.username)
            .addField("IDs", "```User ID: " + m.id + "```");
        logs.send(logsEmbed);
    }
});
bot.on("guildBanRemove", (g, m) => {
      logsEmbed.setDescription("")
    .setTitle("");
    logsEmbed.fields=[];
    const logs = g.channels.find(r => r.name === ("logs"));
    if (logs) {
        logsEmbed.setTitle("Action: Unban")
            .addField("Unbanned User", m.username)
            .addField("IDs", "```User ID: " + m.id + "```");
        logs.send(logsEmbed);
    }
});
bot.on("guildMemberAdd", async mem => {
      logsEmbed.setDescription("")
    .setTitle("");
    logsEmbed.fields=[];
    mem.guild.fetchInvites()
        .then(guildInvites => {
            const ei = invites[mem.guild.id];
            invites[mem.guild.id] = guildInvites;
            const invite = guildInvites.find(i => ei.get(i.code)
                .uses < i.uses);
            const inviter = bot.users.get(invite.inviter.id);
            const logs = mem.guild.channels.find(r => r.name === ("logs"));
            if (logs) {
                logsEmbed.setTitle("User Joined")
                    .addField("User", mem.user.username)
                    .addField("Avatar URL", mem.user.avatarURL)
                    .addField("Account Creation Date", mem.user.createdAt)
                    .addField("Invite Used", invite.code + " created by " + inviter.tag + ", used " + invite.uses + " times.")
                    .addField("IDs", "```User ID: " + mem.user.id + "\nInviter ID: " + inviter.id + "```");
                logs.send(logsEmbed);
            }
        });
});
bot.on("guildMemberRemove", async mem => {
      logsEmbed.setDescription("")
    .setTitle("");
    logsEmbed.fields=[];
             mem.guild.fetchInvites()
        .then(guildInvites => {
            const ei = invites[mem.guild.id];
            invites[mem.guild.id] = guildInvites;
            const invite = guildInvites.find(i => ei.get(i.code)
                .uses < i.uses);
            const inviter = bot.users.get(invite.inviter.id);
            const logs = mem.guild.channels.find(r => r.name === ("logs"));
            if (logs) {
                logsEmbed.setTitle("User Left")
                    .addField("User", mem.user.username)
                    .addField("Avatar URL", mem.user.avatarURL)
                    .addField("Account Creation Date", mem.user.createdAt)
                    .addField("Invite Used", invite.code + " created by " + inviter.tag + ", used " + invite.uses + " times.")
                    .addField("IDs", "```User ID: " + mem.user.id + "\nInviter ID: " + inviter.id + "```");
                logs.send(logsEmbed);
            }
        });
});
bot.on("messageDelete", async m => {
      logsEmbed.setDescription("")
    .setTitle("");
    logsEmbed.fields=[];
    const logs = m.guild.channels.find(r => r.name === ("logs"));
    if (logs) {
        logsEmbed.setTitle("Deleted Message")
            .addField("Author", m.author.username)
            .addField("Content", m.content)
            .addField("Channel", m.channel.name)
            .addField("Message Time", m.createdAt)
            .addField("IDs", "```Message ID: " + m.id + "\nUser ID: " + m.author.id + "```");
        logs.send(logsEmbed);
    }
});
bot.on("messageUpdate", (o, n) => {
      logsEmbed.setDescription("")
    .setTitle("");
    logsEmbed.fields=[];
    const logs = o.guild.channels.find(r => r.name === ("logs"));
    if (logs && o.content !== n.content) {
        logsEmbed.setTitle("Action: Edit Message")
            .addField("User", o.author.username)
            .addField("Was", o.content)
            .addField("Now Is", n.content)
            .addField("IDs", "```Message ID: " + o.id + "\nUser ID: " + o.author.id + "```");
        logs.send(logsEmbed);
    }
});
bot.on("roleCreate", async r => {
      logsEmbed.setDescription("")
    .setTitle("");
    logsEmbed.fields=[];
    const logs = r.guild.channels.find(r => r.name === ("logs"));
    if (logs) {
        logsEmbed.setTitle("Action: Create Role")
            .addField("Name", r.name)
            .addField("Position", r.calculatedPosition)
            .addField("Hex", r.hexColor)
            .addField("IDs", "```Role ID: " + r.id + "```");
        logs.send(logsEmbed);
    }
});
bot.on("roleDelete", async r => {
      logsEmbed.setDescription("")
    .setTitle("");
    logsEmbed.fields=[];
    const logs = r.guild.channels.find(r => r.name === ("logs"));
    if (logs) {
        logsEmbed.setTitle("Action: Delete Role")
            .addField("Name", r.name)
            .addField("Position", r.calculatedPosition)
            .addField("Hex", r.hexColor)
            .addField("IDs", "```Role ID: " + r.id + "```");
        logs.send(logsEmbed);
    }
});
var laws = [
  "**Law 1: Spam**\nSending an unreasonable amount of messages in a short amount of time. (Misdemeanor)",
  "**Law 2: Raid**\nSending a massive amount of messages in a very short time, or otherwise participating in a large attack on our server, is prohibited. (Felony/Banishment)",
  "**Law 3: Alt**\nUsing more than a single alternative account, or otherwise using an alt to your advantage, is prohibited. (Felony, Bansihment of Alt(s))",
  "**Law 4: Misconduct**\nMisuse of government powers is hereby prohibited. (Misdemeanor, Felony, or Impeachment. )",
  "**Law 5: NSFW/L**\nSending NSFW outside of <#644334931434274816>, or NSFL anywhere is prohibited. (Felony)",
  "**Law 6: Slander**\nSeriously attempting to damage someone's reputation in a serious, harmful, or aggressive nature is prohibited. (Felony)",
  "**Law 7: Corruption**\nGovernment officials participating in dishonest actions, bribery, or otherwise seriously threatening others for their own good will result in a felony and impeachment.",
  "**Law 8: Obstruction**\nDestroying evidence in any such way that it can be used for your own advantage is strictly prohibited. (Automatic loss of case)",
   "**Law 9: Invite**\nSending invites anywhere is prohibited. (Misdemeanor)"
];
var rights = [
  "**Right 1**\n The people have the right to freedom of speech.",
  "**Right 2**\n The executive branch shall not restrain any protest demanding the government for a redress of grievances.",
  "**Right 3**\n The accused has the right to cross-examine witnesses and dispute evidence in a fair, public and speedy process with a qualified and earnest attorney.",
  "**Right 4**\n For all but the worst crimes, the defendant must have been convicted for at least three misdemeanors of the same crime before a prison sentence may be ruled.",
  "**Right 5**\n The people have the right to remain silent.", "**Right 6**\n All communications during governmental proceedings must be readily available to the public.",
  "**Right 7**\n The accused shall not be prosecuted for the same crime more than once.",
  "**Right 8**\n The people may only be prosecuted for a crime within two weeks of the date it was committed.",
  "**Right 9**\n The people shall not be subject to vague or unreasonable legislation, including ",
  "**Right 10**\n Individual conduct in a court proceeding shall have no bearing on the verdict."
];
var updates = [
  'Fixed some bugs.',
  'Cleaned up various areas in code.',
  'Fixed or changed permission modules.'
];
var detainer;
var reason;
var courtThing;
var judgeToUse;
var cj;
var cp;
bot.on("message", async msg => {
    if (msg.author.bot) return; // any message from a bot is ignored
    if (msg.content.indexOf(config.prefix) !== 0) return; // checks to make sure the prefix (derived from config.json) is present in the message
    const args = msg.content.slice(1)
        .trim() // removes extra spaces
        .split(/ +/g); // splits by spaces
    const cmd = args.shift()
        .toLowerCase(); // finds the actual command, in lowercase
    const guild = msg.guild; // shortens code
    const logs = guild.channels.find(ch => ch.name === 'logs' && ch.type == "text"); // logs channel
    const log = new Discord.RichEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
        .setTimestamp()
        .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
            .toString(16)
            .substr(1, 6)); // log embed
    if (cmd === "nominate") {
        var member = msg.mentions.members.first(); // the mentioned member
        var send = (member.displayName + " can not be nominated now. " + member.displayName + " must be impeached from their current position in order to be nominated at this time."); // used to save space
        const nom = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL) // just embed stuff :)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6)); // this will be shwon on all embeds. Sets a random color, the author, and a timestamp
        if (args) {
            let role = undefined; // this is required to prevent scoping issues 
            if (msg.member.roles.find(r => r.name === "Speaker of the House")) { // checks the role
                role = guild.roles.find(r => r.name === "Congress"); // the role to give
            } else if (msg.member.roles.find(r => r.name === "Chief Justice")) {
                role = guild.roles.find(r => r.name === "Judge");
            } else if (msg.member.roles.find(r => r.name === "Chief of Police")) {
                role = guild.roles.find(r => r.name === "Officer");
            }
            if (role) {
                if (member.roles.find(r => r.name === "Judge") || member.roles.find(r => r.name === "Officer") || member.roles.find(r => r.name === "Congress")) { // makes sure they aren't in the gov't already
                    msg.channel.send(send);
                } else {
                    if (role.name === "Congress") {
                        msg.channel.send("Nominate for House or Senate?"); // Note: you need to have at least 9 house members per senate member
                        msg.channel.awaitMessages(m => m.author.id == msg.author.id, {
                                max: 1,
                                time: 30000
                            }) // waits 30 secs for a message...
                            .then(collected => {
                                if (collected.first()
                                    .content.toLowerCase() == 'house') { // ...and if its content is "house"...
                                    member.addRole(guild.roles.find(r => r.name === "House")); // ...give them house!
                                } else if (collected.first()
                                    .content.toLowerCase() == 'senate') { // same thing here
                                    member.addRole(guild.roles.find(r => r.name === "Senate")); // ^
                                } else {
                                    msg.channel.send("Please choose either House or Senate.");
                                    return;
                                }
                            })
                            .catch(() => {
                                msg.channel.send("No reply after 30 seconds. Pleae choose either House or Senate.");
                                return;
                            });
                    }
                    member.addRole(role)
                        .catch(console.error);
                    nom.setDescription(msg.member.displayName + ", you have successfully nominated " + member.displayName + " for " + role.name + "!");
                    nom.setFooter('Nominated ' + member.displayName + ' for ' + role + ".");
                    log.setTitle("Action: Nominate");
                    log.setDescription("User: " + member.displayName + "\n\nPerpetrator: " + msg.member.displayName + "\n\nPosition: " + role.name); // i plan to format this just like the logs you saw in the events earlie but im too lazy tb honest
                    logs.send(log);
                }
            } else {
                nom.setDescription("You lack the proper role to use this command.")
                    .setFooter("You lack any branch-leading role in the Permissions Object."); // i'm just putting what the permission module is because 1. i plan to remove them 2. its cancer 3. i don't share them lol 4. it's far less efficient than the permission handling here
            }
        } else {
            nom.setDescription("Please mention someone to nominate.");
            nom.setFooter('Error in syntax: missing args.');
        }
        msg.channel.send(nom); // putting this out here shortens the code, drastically speeds up performance, and makes sure no scoping issues occur
    } // a lot of stuff has already been explained so I won't put more comments here mostly
    if (cmd === "impeach" || cmd === "peach") {
        let member = msg.mentions.members.first();
        let send = ("You either do not have the correct role for you to impeach " + member.user.username + ", or another error has occured. Please try again later.");
        const peach = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        if (args) {
            let role = undefined;
            if (msg.member.roles.find(r => r.name === "Speaker of the House")) {
                role = guild.roles.find(r => r.name === "Congress");
            }
            if (msg.member.roles.find(r => r.name === "Chief Justice")) {
                role = guild.roles.find(r => r.name === "Judge");
            }
            if (msg.member.roles.find(r => r.name === "Chief of Police")) {
                role = guild.roles.find(r => r.name === "Officer");
            }
            if (role) {
                if (member.roles.find(r => r.name === role.name)) {
                    member.removeRole(role)
                        .catch(console.error);
                        if(role.name==="Congress") {
                          if(member.roles.find(r => r.name==="House")) {
                            member.removeRole(guild.roles.find(r => r.name==="House"));
                          }
                          if(member.roles.find(r => r.name==="Senate")) {
                            member.removeRole(guild.roles.find(r => r.name==="Senate"));
                          }
                        }
                    peach.setDescription(msg.member.displayName + ", I have impeached " + member.displayName + " from " + role.name + ".");
                    peach.setFooter('Impeached ' + member.displayName + ' from ' + role.name + ".");
                    log.setTitle("Action: Impeach");
                    log.setDescription("User: " + member.displayName + "\n\nPerpetrator: " + msg.member.displayName + "\n\nPosition: " + role.name);
                    logs.send(log);
                } else {
                    peach.setDescription(send);
                }
            } else {
                peach.setDescription("You lack the proper role to use this command.")
                    .setFooter("You lack a branch role in the Permissions Object.");
            }
        } else {
            peach.setDescription("Args not found. Please resend the command with proper arguments.")
            .setFooter('Couldn\'t find args.');
        }
        msg.channel.send(peach);
    }
    if (cmd === "poll") {
        if (msg.member.roles.find(r => r.name === "Bot Admin")) {
            let argString = args.join(" "); // this turns the args into a string...
            let parsedArgs = argString.split('"'); // ...then splits it by the " keychar... 
            console.log(parsedArgs); // ...and then...
            parsedArgs.splice(0, 1); // ...removes the blank value in front...
            parsedArgs.splice(1, 1); // ...removes the blank value after the first argument...
            parsedArgs.splice(2, 1); // ...removes the blank value after the second argument...
            parsedArgs.splice(3, 1); // ...and removes the blank value at the end!
            console.log(parsedArgs); // figured this out myself, pretty proud of it tbh
            const upvote = guild.emojis.find(e => e.name === "Upvote");
            const downvote = guild.emojis.find(e => e.name === "Downvote");
            msg.channel.send("@everyone, " + parsedArgs[0] + " Vote here:\n\n" + upvote + ": " + parsedArgs[1] + "\n\n" + downvote + ": " + parsedArgs[2])
                .then(async msg => { // required to get awaits to work
                    try {
                        await msg.react(upvote); // await is really good, one of the best functions in EScript
                        await msg.react(downvote);
                    } catch (error) { // in case any await errors out, this catches them
                        console.log(error);
                    }
                });
        } else {
            msg.channel.send("You lack permissions to use this command.");
        }
    }
    if (cmd === "elect") {
        const elect = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        if (args.length > 3) {
            let num = args[0];
            let pos = args[1];
            if (msg.member.roles.find(r => r.name === "President")) {
                let electTo = "Yo @everyone, it's election time. Vote here for the " + pos + ". Note: Using alts to vote is *not* allowed and will get you disqualified.";
                for (let i = 0; i < num; i++) {
                    electTo += ("\n\n" + (i + 1) + ": " + args[i + 2]);
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
                log.setTitle("Action: Create Election");
                log.setDescription("Perpetrator: " + msg.member.displayName);
                logs.send(log);
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
    }
    if (cmd === "resign") {
        let pos = undefined;
        const resign = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        let officer = msg.member.roles.find(r => r.name === "Officer");
        let congress = msg.member.roles.find(r => r.name === "Congress");
        let judge = msg.member.roles.find(r => r.name === "Judge");
        cj = msg.member.roles.find(r => r.name === "Chief Justice");
        cp = msg.member.roles.find(r => r.name === "Chief of Police");
        let speaker = msg.member.roles.find(r => r.name === "Speaker of the House");
        if (officer || congress || judge || cj || cp || speaker) { // checks if they have any roles
            if (officer) {
                pos = "Officer";
            }
            if (congress) {
                pos = "Congress";
                if (msg.member.roles.find(r => r.name === "House")) {
                    msg.member.removeRole(guild.roles.find(r => r.name === "House"));
                }
                if (msg.member.roles.find(r => r.name === "Senate")) {
                    msg.member.removeRole(guild.roles.find(r => r.name === "Senate"));
                } // these things are to make sure no one has the role remaining
            }
            if (judge) {
                pos = "Judge";
            }
            if (cj) {
                pos = "Chief Justice";
            }
            if (cp) {
                pos = "Chief of Police";
            }
            if (speaker) {
                pos = "Speaker of the House";
            }
            console.log(pos);
            msg.member.removeRole(guild.roles.find(r => r.name === pos))
                .catch(console.error);
            resign.setDescription(msg.member.displayName + ", you have successfully resigned from the position of " + pos + ".");
            resign.setFooter('Resigned from ' + pos);
            log.setTitle("Action: Resign");
            log.setDescription("Perpetrator: " + msg.member.displayName + "\n\nPosition: " + pos);
            logs.send(log);
        } else {
            resign.setDescription("You are currently unable to resign. If you are in a position which you believe you should be able to resign, please contact Sperg.");
            resign.setFooter('You lack any governmental position.');
        }
        msg.channel.send(resign);
    }
    if (cmd === "detain") {
        let argString = args.join(" ");
        let parsedArgs = argString.split('"', 2);
        parsedArgs.splice(0,1);
        parsedArgs.splice(1,1);
        let member = msg.mentions.members.first();
        const det = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        detainer = msg.author;
        let role = guild.roles.find(r => r.name === "Detained");
        if (parsedArgs.length < 1) {
            det.setDescription("Please specify which user to detain.");
            det.setFooter('Arg detainArg.user.to("Action", "Detain") is undefined');
        } else if (parsedArgs.length < 2) {
            det.setDescription("Please specify the reason.");
            det.setFooter('Arg detainArg.user.to("Reason", "Detain") is undefined');
        } else {
            if (!msg.member.roles.find(r => r.name === "Officer") && !msg.member.roles.find(r => r.name === "Chief of Police")) {
                det.setDescription("You must be an officer to use this command.");
                det.setFooter('You lack the Officer role in the Permission Object.');
            } else {
                det.setDescription(msg.member.displayName + ", I have detained " + member.displayName + ", for reason " + args[1] + ". A judge must **;approve** this detain within **5 minutes** or you will be IMPEACHED!");
                reason = (parsedArgs[1]);
                det.setFooter('User ' + member.displayName + " has been detained.");
                log.setTitle("Action: Detain");
                log.setDescription("User: " + member.displayName + "\n\nPerpetrator: " + msg.member.displayName + "\n\nReason: " + reason);
                logs.send(log);
                member.addRole(role) // the good stuff starts now..
                    .catch(console.error);
                setTimeout(
                    () => {
                        if (!member.roles.find(r => r.name === "Court")) { // checks if the detainment was approved by a judge or not
                            msg.member.removeRole(guild.roles.find(r => r.name === "Officer"))
                                .catch(console.error);
                            member.removeRole(role)
                                .catch(console.error);
                            det.setDescription(msg.member.displayName + ", you have been impeached because no judges approved this detainment in the 5 minutes.");
                            det.setFooter('Impeached from Officer.');
                        }
                    }, 300000); // waits 5 minutes to check whether they have been approved, does nothing if it has but impeaches you if it hasn't
            }
        }
        msg.channel.send(det);
    }
    if (cmd === "approve") {
        courtThing = msg.mentions.members.first();
        let detained = guild.roles.find(r => r.name === "Detained");
        const approve = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        if (msg.member.roles.find(r => r.name === "Judge") || msg.member.roles.find(r => r.name === "Chief Justice")) {
            if (courtThing.roles.find(r => r.name === "Detained")) { // checks for detainment
                courtThing.removeRole(detained)
                    .catch(console.error);
                const sender = msg.member;
                courtThing.addRole(guild.roles.find(r => r.name === "Court"));
                approve.setDescription(sender.displayName + ", " + courtThing.displayName + " has been PUT IN COURT.");
                approve.setFooter('Put ' + courtThing.displayName + ' in court.');
                var judgesStuff = []; // blank array
                guild.members.forEach(member => {
                    if (member.roles.find(r => r.name === "Judge")) {
                        if (member !== courtThing&&member!==msg.member) {
                            judgesStuff.push(member); // puts the member in the array if they're a judge, aren't the detained person, and aren't the approver
                        } else {
                            console.log(member, courtThing);
                        }
                    }
                });
                judgeToUse = judgesStuff[Math.floor(Math.random() * judgesStuff.length)]; // chooses a random judge
                console.log(judgeToUse.user.id);
                console.log(judgeToUse.user);
                cj = guild.roles.find(r => r.name === "Chief Justice");
                cp = guild.roles.find(r => r.name === "Chief of Police");
                guild.createChannel(detainer.username + "-vs-" + courtThing.displayName, {
                        type: 'text',
                        permissionOverwrites: [{
                            id: guild.defaultRole.id,
                            deny: ['SEND_MESSAGES'], // makes it so @everyone can't send stuff
                    }, {
                            id: cj.id,
                            allow: ['SEND_MESSAGES'],
                    }, {
                            id: cp.id,
                            allow: ['SEND_MESSAGES'],
                    }, {
                            id: detainer.id,
                            allow: ['SEND_MESSAGES'],
                    }, {
                            id: judgeToUse.user.id,
                            allow: ['SEND_MESSAGES'],
                    }, {
                            id: courtThing.user.id,
                            allow: ['SEND_MESSAGES'],
                    }, ],
                    })
                    .then(channel => {
                        let category = guild.channels.find(c => c.name == "court" && c.type == "category");
                        if (!category) {
                            throw new Error("Category channel does not exist");
                        }
                        channel.setParent(category.id);
                        channel.send("**Court Case:** \n\n" + detainer + " vs. " + courtThing.displayName + ". Reason for court case: " + reason + "\n\n" + judgeToUse.displayName + " will be looking over this case. \n\n" + judgeToUse.displayName + ", remember to read the laws, rights, and interpretations before delivering your verdict. And always remember, feel free to ping Sperg (AKA doctor mario/bug/rend), the President, VP, CJ, or CP to get any help needed. \n\nNow, we don\'t have infinite time, **GET GOING!**")
                            .catch(console.error);
                        log.setTitle("Action: Approve Detainment");
                        log.setDescription("User: " + courtThing.displayName + "\n\nPerpetrator: " + msg.member.displayName);
                        logs.send(log);
                        console.log(channel);
                    })
                    .catch(console.error);
            } else {
                approve.setDescription("This user is not detained.");
                approve.setFooter('User ' + courtThing.displayName + ' does not have the role "Detained"');
            }
        } else {
            approve.setDescription("You must be a Judge to use this command.");
            approve.setFooter('You lack the Judge role in the Permissions Object.');
        }
        msg.channel.send(approve); // this took so long to get to work im so proud of myself ahadgjasbh
    }
    if (cmd === "restart" || cmd === "reset") {
        if (msg.member.roles.find(r => r.name === "Bot Owner")) {
            process.exit();
            bot.login(config.token);
        }
    }
    if (cmd === "guilty") {
        let free = function() {
            courtThing.removeRole(guild.roles.find(r => r.name === "Muted"));
        };
        const guilty = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        if (msg.channel.parent === "court") {
            if (msg.member.user.id === judgeToUse.user.id) { // makes sure it's used in court by the selected judge
                if (args.length > 1) {
                    courtThing.addRole(guild.roles.find(r => r.name === "Muted"));
                    guilty.setDescription(msg.member.displayName + ", " + courtThing.displayName + " has been found **GUILTY.** If a time other than 0 has been put on a crime not punishable by imprisonment, you will be IMPEACHED!"); // you will
                    guilty.setFooter('Ruled the case as guilty.');
                    msg.channel.send(guilty);
                    msg.channel.replacePermissionOverwrites({
                        overwrites: [{
                            id: cj.id,
                            deny: ['SEND_MESSAGES'],
                        }, {
                            id: cp.id,
                            deny: ['SEND_MESSAGES'],
                        }, {
                            id: detainer.id,
                            deny: ['SEND_MESSAGES'],
                        }, {
                            id: judgeToUse.user.id,
                            deny: ['SEND_MESSAGES'],
                        }, {
                            id: courtThing.user.id,
                            deny: ['SEND_MESSAGES'],
                        }, ],
                    });
                    setTimeout(free, (args[0] * 3600000));
                    log.setTitle("Action: Rule case as Guilty");
                    log.setDescription("Perpetrator: " + msg.member.displayName);
                    logs.send(log);
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
    if (cmd === "innocent" || cmd === "inno") {
        const inno = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        if (msg.channel.parent === "court") {
            if (msg.member.user.id === judgeToUse.user.id) {
                if (args.length > 0) {
                    inno.setDescription(msg.member.displayName + ", " + courtThing.displayName + " has been found **INNOCENT.**");
                    inno.setFooter('Ruled this case as innocent.');
                    msg.channel.send(inno);
                    msg.channel.replacePermissionOverwrites({
                        overwrites: [{
                            id: cj.id,
                            deny: ['SEND_MESSAGES'],
                        }, {
                            id: cp.id,
                            deny: ['SEND_MESSAGES'],
                        }, {
                            id: detainer.id,
                            deny: ['SEND_MESSAGES'],
                        }, {
                            id: judgeToUse.user.id,
                            deny: ['SEND_MESSAGES'],
                        }, {
                            id: courtThing.user.id,
                            deny: ['SEND_MESSAGES'],
                        }, ],
                    });
                    log.setTitle("Action: Rule case as Innocent");
                    log.setDescription("Perpetrator: " + msg.member.displayName);
                    logs.send(log);
                } else if (args.length === 0) {
                    inno.setDescription(msg.member.displayName + ", please provide a reason.");
                    inno.setFooter('Reason unspecified.');
                }
            }
        } else {
            inno.setDescription(msg.member.displayName + ", this command may only be used in a court case.");
            inno.setFooter('Category ' + msg.channel.parent + ' does not match category "court".');
        }
        msg.channel.send(inno);
    }
    if (cmd === "mistrial") {
        const mis = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        if (msg.channel.parent === "court") {
            if (msg.member.user.id === judgeToUse.user.id) {
                mis.setDescription(msg.member.displayName + ", you have declared this case as a MISTRIAL.");
                mis.setFooter('Case declared a mistrial');
                msg.channel.send(mis);
                msg.channel.replacePermissionOverwrites({
                    overwrites: [{
                        id: cj.id,
                        deny: ['SEND_MESSAGES'],
                    }, {
                        id: cp.id,
                        deny: ['SEND_MESSAGES'],
                    }, {
                        id: detainer.id,
                        deny: ['SEND_MESSAGES'],
                    }, {
                        id: judgeToUse.user.id,
                        deny: ['SEND_MESSAGES'],
                    }, {
                        id: courtThing.user.id,
                        deny: ['SEND_MESSAGES'],
                    }, ],
                });
                log.setTitle("Action: Rule case as a Mistrial");
                log.setDescription("Perpetrator: " + msg.member.displayName);
                logs.send(log);
            }
        } else {
            mis.setDescription(msg.member.displayName + ", this command may only be used in a court case.");
            mis.setFooter('Category ' + msg.channel.parent + ' does not match category "court".');
            msg.channel.send(mis);
        }
    }
    if (cmd === "law") {
        var lawThing = (laws[args[0] - 1]);
        const lawSend = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        lawSend.setDescription(lawThing);
        lawSend.setFooter('Law ' + args[0]);
        msg.channel.send(lawSend);
        console.log(lawSend);
    }
    if (cmd === "right") {
        var rightThing = (rights[args[0] - 1]);
        const rightSend = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        rightSend.setDescription(rightThing);
        rightSend.setFooter('Right ' + args[0]);
        msg.channel.send(rightSend);
        console.log(rightSend);
    }
    if (cmd === "update") {
        const update = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        if (msg.member.roles.find(r => r.name === "Bot Owner") || msg.member.roles.find(r => r.name === "Bot Admin")) {
            update.setTitle("New update:");
            if (args[0] === '1' || args[0] === '2' || args[0] === '3') {
                update.setDescription(updates[args[0] - 1]);
            } else {
                update.setDescription(args.join(" "));
            }
            update.setFooter('Bot update!');
        } else {
            update.setDescription("Only a bot owner or admin may use this command.");
            update.setFooter('You lack the Bot Owner and Bot Admin roles in the Permissions Object.');
        }
        msg.channel.send(update);
    }
    if (cmd === "module" || cmd === "modules") {
        const module = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        if (args.length === 0) {
            module.setTitle("Modules available:");
            module.setDescription("Owners, Admins, Branches, Congress,\nPolice, Judicial, General");
            module.setFooter('Modules available');
        } else if (args[0] === "Owners" || args[0] === "Owner") {
            module.setTitle("Module Owners:");
            module.setDescription("Update, Elect, Reset, Eval");
            module.setFooter('Owners Module');
        } else if (args[0] === "Admins" || args[0] === "Admin") {
            module.setTitle("Module Admins:");
            module.setDescription("Update, Poll");
            module.setFooter('Admins Module');
        } else if (args[0] === "Branches") {
            module.setTitle("Module Branches:");
            module.setDescription("Nominate, Impeach, Resign");
            module.setFooter('Branches Module');
        } else if (args[0] === "Congress") {
            module.setTitle("Module Congress:");
            module.setDescription("Bill, Resign, Clear");
            module.setFooter('Congress Module');
        } else if (args[0] === "Police" || args[0] === "Officers") {
            module.setTitle("Module Police:");
            module.setDescription("Detain");
            module.setFooter('Police Module');
        } else if (args[0] === "Judicial" || args[0] === "Judges") {
            module.setTitle("Module Judicial:");
            module.setDescription("Approve, Guilty, Innocent, Mistrial");
            module.setFooter('Judicial Module');
        } else if (args[0] === "General" || args[0] === "General") {
            module.setTitle("Module General:");
            module.setDescription("Help, Modules, ping");
            module.setFooter('General Module');
        } else {
            module.setDescription("Invalid module!");
            module.setFooter('Error in syntax: module "' + args.join(" ") + '" is invalid or not available.');
        }
        msg.channel.send(module);
    }
    if (cmd === "bill") {
        const bill = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        if (msg.member.roles.find(r => r.name === "Congress")) {
            if (args.length === 0) {
                bill.setDescription("Please enter content for the bill.");
                bill.setFooter("No message has been found.");
                msg.channel.send(bill);
            } else {
                const billMsg = args.join(" ");
                bill.setTitle("Bill in Congress by " + msg.member.displayName + ".");
                bill.setDescription(billMsg);
                bill.setFooter('Bill proposed!');
                msg.delete()
                    .catch(O_o => {});
                msg.channel.send(bill)
                    .then(async msg => {
                        try {
                            await msg.pin();
                            await msg.react(guild.emojis.find(emoji => emoji.name === "Upvote"));
                            await msg.react(guild.emojis.find(emoji => emoji.name === "Downvote"));
                            await msg.channel.send("@congress bill in #congress");
                        } catch (error) {
                            console.log(error);
                        }
                    });
                log.setTitle("Action: Create Bill");
                log.setDescription("Perpetrator: " + msg.member + "\n\Bill: " + billMsg);
                logs.send(log);
            }
        }
    }
    if (cmd === "eval") {
        if (msg.member.roles.find(r => r.name === "Bot Owner")) {
            msg.channel.send("Input```" + args.join(" ") + "```Returns```" + eval(args.join(" ")) + "```")
                .catch(async er => {
                    msg.channel.send("Input```" + args.join(" ") + "```Error```" + er + "```");
                });
        }
    }
    if (cmd === "clear" || cmd === "purge") {
        if (msg.member.roles.find(r => r.name === "Congress")) {
            if (args) {
                msg.channel.fetchMessages({
                        limit: args[0],
                    })
                    .then(async msgs => {
                        msg.channel.bulkDelete(msgs)
                            .catch(error => console.log(error.stack));
                    });
                msg.channel.send("Cleared " + args[0] + " messages.");
            } else {
                msg.channel.fetchMessages({
                        limit: 20,
                    })
                    .then(async msgs => {
                        msg.channel.bulkDelete(msgs)
                            .catch(error => console.log(error.stack));
                    });
                msg.channel.send("Cleared 20 messages.");
            }
        } else {
            const bruh = new Discord.RichEmbed()
                .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
                .setTimestamp()
                .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                    .toString(16)
                    .substr(1, 6));
            bruh.setDescription("You lack permissions to use this command.");
            msg.channel.send(bruh);
        }
    }
    if (cmd === "ping") {
      let start = Date.now();
      console.log(start);
        msg.channel.send("```API Ping: " + bot.ping + "```")
            .then(async ms => {
              console.log(msg.createdTimestamp);
                ms.edit("```API Ping: " + bot.ping + "\nClient Ping: " + (start - msg.createdTimestamp) + "```");
            });
    }
    if (cmd === "help") {
        const help = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        if (args.length === 0 || args[0] === "1") {
            help.addField(";nominate", "For CP, CJ, or Speaker to nominate police officers, Judges, and members of Congress respectively.");
            help.addField(";impeach", "For CP, CJ, or Speaker to impeach police officers, Judges, and members of Congress respectively.");
            help.addField(";elect", "For Pres or Sperg to create elections for Pres, VP, Speaker, CJ, or CP.");
            help.addField(";poll", "For bot owners to create polls.");
            help.addField(";resign", "For anyone in a governmental position (Besides VP/Pres) to resign from their positions.");
            help.addField(";detain", "For officers to detain someone for breaking a law. A judge must use `;approve` on the detained user to put them in court.");
            help.addField(";approve", "For judges to approve any detainments put on by officers, which sends them to court.");
            help.addField(";reset", "For bot owners to restart the process of FederalBot.");
            help.addField(";guilty", "For the judge of a case to rule the defendant as `guilty`.");
            help.setFooter('Page 1 of 2');
        } else if (args[0] === '2') {
            help.addField(";innocent", "For the judge of a case to rule the defendant as `not guilty`.");
            help.addField(";mistrial", "For the judge of a case to rule the case as a `mistrial`.");
            help.addField(";law", "Displays any of the 9 current laws.");
            help.addField(";right", "Displays any of the 10 current rights.");
            help.addField(";update", "For bot owners/admins to display updates to the bot.");
            help.addField(";module", "Displays the various modules of FederalBot Reborn.");
            help.addField(";bill", "Creates a bill in Congress.");
            help.addField(";eval", "For owners to evaluate code.");
            help.addField(";clear", "Members of Congress can clear messages in a channel.");
            help.addField(";ping", "Gets the ping from the API and Client.");
            help.setFooter('Page 2 of 2');
        } else {
            if (args[0] === "nominate") {
                help.setTitle(";nominate");
                help.setDescription("For CP, CJ, or Speaker to nominate a member for Officer, Judge, and Congress respectively.");
                help.addField("Usage", ";nominate (member)");
                help.addField("Example:", ";nominate @sperg#6969 // Nominates member 'sperg#6969' for Judge, Officer, or Congress.");
                help.setFooter(';nominate command');
            } else if (args[0] === "impeach") {
                help.setTitle(";impeach");
                help.addField("Aliases", ";impeach, ;peach");
                help.setDescription("For CP, CJ, or Speaker to impeach a member from Officer, Judge, or Congress respectively.");
                help.addField("Usage", ";impeach (member)");
                help.addField("Example:", ";impeach @sperg#6969 // Impaches member 'sperg#6969' from Judge, Officer, or Congress.");
                help.setFooter(';impeach command');
            } else if (args[0] === "elect") {
                help.setTitle(";elect");
                help.setDescription("For Pres or Sperg to create elections for CJ, CP, Speaker, Pres, or VP.");
                help.addField("Usage", ";elect (Number of candidates) (Position to elect for) (Candidates...)");
                help.addField("Example:", ";elect 2 President @bruh#2366 @sperg#6969 // Creates an election with the position being President, and the candidates being bruh and sperg");
                help.setFooter(';elect command');
            } else if (args[0] === "poll") {
                help.setTitle(";poll");
                help.setDescription("For bot owners/admins to create polls with an upvote and downvote option.");
                help.addField("Usage", ";poll (poll message) (upvote option) (downvote option)");
                help.addField("Example", ';poll "Should we separate the Speaker of the House into one for House and one for Senate?" "Separate it!" "Don\'t separate the role" // Creates a poll with the content shown.');
                help.setFooter(";poll command");
            } else if (args[0] === "resign") {
                help.setTitle(";resign");
                help.setDescription("For anyone in the government to resign from their position.");
                help.addField("Usage", ";resign");
                help.setFooter(';resign command');
            } else if (args[0] === "detain") {
                help.setTitle(";detain");
                help.setDescription("For officers to detain someone who has broken the law. A judge must `;approve` the detainment for the user to be sent to court.");
                help.addField("Usage", ";detain (member) (reason)");
                help.addField("Example:", ";detain @nigward#6969 'Law 3' // Detains member 'nigward#6969', which can be approved by a judge.");
                help.setFooter(';detain command');
            } else if (args[0] === "approve") {
                help.setTitle(";approve");
                help.setDescription("For a judge to approve a detained user. If they aren't detained, the command will fail.");
                help.addField("Usage", ";approve (member)");
                help.addField("Example:", ";approve @nigward#6969 // Approves the detainment set on member 'nigward#6969', which creates a channel in court and sends a message there. (Note: this one took FOREVER to get working)");
                help.setFooter(';approve command');
            } else if (args[0] === "reset") {
                help.setTitle(";reset");
                help.addField("Aliases", ";reset, ;restart");
                help.setDescription("For Sperg or any bot owner to reset the FederalBot process.");
                help.addField("Usage", ";reset");
            } else if (args[0] === "guilty") {
                help.setTitle(";guilty");
                help.setDescription("For the judge of a case to rule the defendant `guilty`. Note: if a prison sentence is put on a 1st or 2nd misdemeanor, you will be immediately impeached and the user will be freed.");
                help.addField("Usage", ";guilty (reason) (prison sentence)");
                help.addField("Example:", ";guilty \"Proven to be sperg's alt. Sperg already has another alt in the server, bug. Law 3 states that you may only have one alt in the server at ANY time, and can not use it to your advantage, thus breaking Law 3. Sperg and his other alt will be put on trial accordingly.\" 24h // Rules the case `guilty`, sentences 'nigward#6969' to a 1 day prison sentence, and closes the case.");
                help.setFooter(';guilty command');
            } else if (args[0] === "innocent") {
                help.setTitle(";innocent");
                help.addField("Aliases", ";innocent, ;inno");
                help.setDescription("For the judge of a case to rule the defendant `not guilty`, or otherwise `innocent`.");
                help.addField("Usage", ";innocent (reason)");
                help.addField("Example:", ";innocent 'The defendant, nigward, just happens to be a friend of Sperg\'s. Interogations from other members have shown that nigward is a classic member of the server, and has been consistently active for a while.' // 'nigward#6969' is ruled `innocent`, and the case is closed.");
                help.setFooter(';innocent command');
            } else if (args[0] === "mistrial") {
                help.setTitle(";mistrial");
                help.setDescription("For the judge of a case to rule the case as a `mistrial`. Note: A mistrial is for an accidental detainment or an otherwise incorrect detainment.");
                help.addField("Usage", ";mistrial");
                help.setFooter(';mistrial command');
            } else if (args[0] === "law") {
                help.setTitle(";law");
                help.setDescription("Shows any of the 9 currently passed laws.");
                help.addField("Usage", ";law (law)");
                help.addField("Example:", ";law 2 // returns law 2, raiding.");
                help.setFooter(';law command');
            } else if (args[0] === "right") {
                help.setTitle(";right");
                help.setDescription("Displays any of the 10 currently passed rights.");
                help.addField("Usage", ";right (right)");
                help.addField("Example:", ";right 1 // returns right 1, the freedom of speech.");
                help.setFooter(';right command');
            } else if (args[0] === "update") {
                help.setTitle(";update");
                help.setDescription("For bot owners or admins to display bot updates.");
                help.addField("Usage", ";update (update syntax)");
                help.addField("Examples:", ";update Added a new command, ;update, for bot owners/admins to display updates. // the bot will send the update. \n\n;update 1 // There are 3 predefined updates: Bug fixes, code cleanup, and new permission modules."); // Permission modules are private bro
                help.setFooter(';update command');
            } else if (args[0] === "module") {
                help.setTitle(";module");
                help.setDescription("Displays the modules, or one specific module.");
                help.addField("Aliases", ";module, ;modules");
                help.addField("Usage", ";module (module to display)");
                help.addField("Examples:", ";module // Shows all modules available. \n\n;module branches // Shows you the commands in the category 'branches'.");
                help.setFooter(';module command');
            } else if (args[0] === "bill") {
                help.setTitle(";bill");
                help.setDescription("For Congress to make bills");
                help.addField("Usage", ";bill (bill)");
                help.addField("Examples:", ";bill Impeach John from Congress! // Returns a bill with content \"Impeach John from Congress!\" and reacts with a yes and no emote.");
                help.setFooter(';bill command');
            } else if(args[0]==="eval") {
              help.setTitle(";eval");
                help.setDescription("For Owners to evaluate JS code. Can also be used as a calculator.");
                help.addField("Usage", ";eval (code)");
                help.addField("Examples:", ";eval function run() {\n   return Math.PI*4;\n}\nrun(); // Outputs a response containing the input, and returns 12.68 (pi*4).");
            } else if(args[0]==="clear") {
              help.setTitle(";clear");
                help.setDescription("Clears out messages in a channel.");
                help.addField("Aliases", ";clear, ;purge");
                help.addField("Usage", ";clear (amount)");
                help.addField("Examples:", ";clear 50 // Clears 50 messages. \n\n;clear // Defaults to 20.");
                help.setFooter(';module command');
            } else if(args[0]==="ping") {
              help.setTitle(";ping");
                help.setDescription("Shows the bot's ping to the API and the Client() object.");
                help.addField("Usage", ";eval");
            }
            else {
                help.setDescription("This is not a command! Please use a command shown on the list.");
                help.setFooter('Error in syntax: "' + args[0] + '" is not a valid command."');
            }
        }
        msg.channel.send(help);
    }
});
bot.login(config.token);
