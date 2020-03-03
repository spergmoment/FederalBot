module.exports = {
    name: 'poll',
    desc: 'For Bot Owners/Admins and President to create polls with an upvote and downvote option.',
    usage: ';poll (poll message) (upvote option) (downvote option)',
    examples: ";poll \"Should we separate the Speaker of the House " + 
    "into one for House and one for Senate?\" " + 
    '"Separate it!" "Don\'t separate the role" // Creates a poll with the content shown.',
    execute(msg, bot, args) {
        const Discord = require("discord.js");
        if (!msg.member.roles.find(r => r.name === "Bot Admin") && !msg.member.roles.find(r => r.name === "Bot Owner") && !msg.member.roles.find(r => r.name === "President")) 
        return msg.channel.send("You lack permissions to use this command.");
        msg.channel.send("Creating poll...")
            .then(m => {
                msg.delete();
                let argString = args.join(" "); // this turns the args into a string...
                let parsedArgs = argString.split('"'); // ...then splits it by the " keychar... 
                console.log(parsedArgs); // ...and then...
                parsedArgs.splice(0, 1) // ...removes the blank value in front...
                    .splice(1, 1) // ...removes the blank value after the first argument...
                    .splice(2, 1) // ...removes the blank value after the second argument...
                    .splice(3, 1); // ...and removes the blank value at the end!
                console.log(parsedArgs); // figured this out myself, pretty proud of it tbh
                const upvote = msg.guild.emojis.find(e => e.name === "Upvote");
                const downvote = msg.guild.emojis.find(e => e.name === "Downvote");
                msg.channel.send("@everyone, " + parsedArgs[0] + " Vote here:\n\n" + upvote + ": " + parsedArgs[1] + "\n\n" + downvote + ": " + parsedArgs[2])
                    .then(async msg => { // required to get awaits to work
                        m.delete();
                        msg.channel.send("Reacting...")
                            .then(async ms => {
                                try {
                                    await msg.react(upvote); // await is really good, one of the best functions in EScript
                                    await msg.react(downvote);
                                } catch (error) { // in case any await errors out, this catches them
                                    console.log(error); // and logs the error
                                }
                                ms.delete();
                            });
                    });
                if (parsedArgs[0].toLowerCase()
                    .includes('law ')) {
                    msg.channel.send("Finding law...")
                        .then(msgs => {
                            let newArgs = parsedArgs[0].split("law ");
                            msg.channel.send("Reminder of law " + newArgs[1].charAt(0) + ":");
                            let lawThing = (bot.laws[newArgs[1].charAt(0) - 1]);
                            const lawSend = new Discord.RichEmbed()
                                .setAuthor(bot.user.tag, bot.user.avatarURL, bot.user.avatarURL)
                                .setTimestamp()
                                .setColor('RANDOM')
                                .setDescription(lawThing)
                                .setFooter('Law ' + args[0]);
                            msg.channel.send(lawSend);
                            msgs.delete();
                        });
                }
                if (parsedArgs[0].toLowerCase()
                    .includes('right ')) {
                    msg.channel.send("Finding right...")
                        .then(msgs => {
                            let newArgs = parsedArgs[0].split("right ");
                            msg.channel.send("Reminder of right " + newArgs[1].charAt(0) + ":");
                            let rightThing = (bot.rights[newArgs[1].charAt(0) - 1]);
                            const rightSend = new Discord.RichEmbed()
                                .setAuthor(bot.user.tag, bot.user.avatarURL, bot.user.avatarURL)
                                .setTimestamp()
                                .setColor('RANDOM')
                                .setDescription(rightThing)
                                .setFooter('Law ' + args[0]);
                            msg.channel.send(rightSend);
                            msgs.delete();
                        });
                }
            });
    }
};