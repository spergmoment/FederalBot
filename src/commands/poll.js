exports.run = (msg, bot, args) => {
    const Discord = require("discord.js");
    if (msg.member.roles.find(r => r.name === "Bot Admin")||msg.member.roles.ind(r => r.name==="Bot Owner")||msg.member.roles.ind(r => r.name==="President")) {
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
                try {
                    await msg.react(upvote); // await is really good, one of the best functions in EScript
                    await msg.react(downvote);
                } catch (error) { // in case any await errors out, this catches them
                    console.log(error); // and logs the error
                }
            });
        if (parsedArgs[0].toLowerCase()
            .includes('law ')) {
            var laws = [
                "**Law 1: Spam**\nSending an unreasonably large amount of messages in a short amount of time. (Misdemeanor)",
                "**Law 2: Raid**\nSending a massive amount of messages in a very short time, or otherwise participating in a large attack on our server, is prohibited. (Banishment)",
                "**Law 3: Alt**\nUsing more than a single alternative account, or otherwise using an alt to your advantage, is prohibited. (Felony)",
                "**Law 4: Misconduct**\nMisuse of government powers is hereby prohibited. (Misdemeanor, Felony, or Impeachment depending on severity)",
                "**Law 5: NSFW/L**\nSending NSFW outside of <#644334931434274816>, or NSFL absolutely anywhere is prohibited. (Felony)",
                "**Law 6: Slander**\Attempting to damage someone's reputation in a serious, harmful, or aggressive nature is prohibited. (Felony)",
                "**Law 7: Corruption**\nGovernment officials participating in dishonest actions, bribery, or otherwise seriously threatening others in a way that directly benefits themselves is very strictly prohibited. (Felony, Impeachment)",
                "**Law 8: Obstruction**\nDestroying evidence in any such way that it can be used for your own advantage is strictly prohibited. (Automatic loss of case, Impeachment (Both I/A))",
                "**Law 9: Invite**\nPurposefully sending any valid invite link to any server other than our own is prohibited. (Misdemeanor)"
            ];
            let newArgs = parsedArgs[0].split("law ");
            msg.channel.send("Reminder of law " + newArgs[1].charAt(0) + ":");
            var lawThing = (laws[newArgs[1].charAt(0) - 1]);
            const lawSend = new Discord.RichEmbed()
                .setAuthor(bot.user.tag, bot.user.avatarURL, bot.user.avatarURL)
                .setTimestamp()
                .setColor('RANDOM');
            lawSend.setDescription(lawThing);
            lawSend.setFooter('Law ' + args[0]);
            msg.channel.send(lawSend);
        }
    } else {
        msg.channel.send("You lack permissions to use this command.");
    }
};
