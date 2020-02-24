exports.run = (msg, bot, args) => {
    const Discord = require("discord.js");
    if (msg.member.roles.find(r => r.name === "Bot Admin") || msg.member.roles.ind(r => r.name === "Bot Owner") || msg.member.roles.ind(r => r.name === "President")) {
        msg.channel.send("Creating poll...")
            .then(m => {
                msg.delete();
                let argString = args.join(" "); // this turns the args into a string...
                let parsedArgs = argString.split('"'); // ...then splits it by the " keychar... 
                console.log(parsedArgs); // ...and then...
                parsedArgs.splice(0, 1); // ...removes the blank value in front...
                parsedArgs.splice(1, 1); // ...removes the blank value after the first argument...
                parsedArgs.splice(2, 1); // ...removes the blank value after the second argument...
                parsedArgs.splice(3, 1); // ...and removes the blank value at the end!
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
                            var lawThing = (bot.laws[newArgs[1].charAt(0) - 1]);
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
            });
    } else {
        msg.channel.send("You lack permissions to use this command.");
    }
};
