exports.run = (msg, bot, args) => {
    const Discord = require('discord.js');
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
        let cj = msg.member.roles.find(r => r.name === "Chief Justice");
        let cp = msg.member.roles.find(r => r.name === "Chief of Police");
        let speaker = msg.member.roles.find(r => r.name === "Speaker of the House");
        if (officer || congress || judge || cj || cp || speaker) { // checks if they have any roles
            if (officer) {
                pos = "Officer";
            }
            if (congress) {
                pos = "Congress";
                if (msg.member.roles.find(r => r.name === "House")) {
                    msg.member.removeRole(msg.guild.roles.find(r => r.name === "House"));
                }
                if (msg.member.roles.find(r => r.name === "Senate")) {
                    msg.member.removeRole(msg.guild.roles.find(r => r.name === "Senate"));
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
            msg.member.removeRole(msg.guild.roles.find(r => r.name === pos))
                .catch(console.error);
            resign.setDescription(msg.member.displayName + ", you have successfully resigned from the position of " + pos + ".");
            resign.setFooter('Resigned from ' + pos);
            bot.logEmbed.setTitle("Action: Resign");
            bot.logEmbed.setDescription("Perpetrator: " + msg.member.displayName + "\n\nPosition: " + pos);
            bot.logs.send(bot.logEmbed);
        } else {
            resign.setDescription("You are currently unable to resign. If you are in a position which you believe you should be able to resign, please contact Sperg.");
            resign.setFooter('You lack any governmental position.');
        }
        msg.channel.send(resign);
};
