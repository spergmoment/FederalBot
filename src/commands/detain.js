exports.run = (msg, bot, args) => {
    const Discord = require("discord.js");
    let member = msg.mentions.members.first();
    const det = new Discord.RichEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
        .setTimestamp()
        .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
            .toString(16)
            .substr(1, 6));
    bot.detainer = msg.author;
    let role = msg.guild.roles.find(r => r.name === "Detained");
    if (args.length < 1) {
        det.setDescription("Please specify which user to detain.");
        det.setFooter('Argument 0 is undefined');
    } else if (args.length < 2) {
        det.setDescription("Please specify the reason.");
        det.setFooter('Argument 1 is undefined');
    } else {
        if (!msg.member.roles.find(r => r.name === "Officer") && !msg.member.roles.find(r => r.name === "Chief of Police")) {
            det.setDescription("You must be an officer to use this command.");
            det.setFooter('You lack the Officer role in the Permission Object.');
        } else {
            det.setDescription(msg.member.displayName + ", I have detained " + member.displayName + 
            ", for reason " + args[1] + ". A judge must **;approve** this detain within **5 minutes** or you will be IMPEACHED!"); 
          /*the above was split in 2 to take up less space*/
            bot.reason = (args[1]);
            det.setFooter('User ' + member.displayName + " has been detained.");
            bot.logEmbed.setTitle("Action: Detain");
            bot.logEmbed.setDescription("User: " + member.displayName + "\n\nPerpetrator: " + msg.member.displayName + "\n\nReason: " + bot.reason);
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
        }
    }
    msg.channel.send(det);
};
