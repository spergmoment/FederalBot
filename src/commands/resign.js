module.exports = {
    name: 'resign',
    desc: 'For anyone in the government to resign from their position.',
    usage: ';resign',
    aliases: ['retire'],
    execute(msg, bot, args) {
        const Discord = require('discord.js');
        let pos;
        const resign = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor("RANDOM");
        let officer = msg.member.roles.find(r => r.name === "Officer");
        let congress = msg.member.roles.find(r => r.name === "Congress");
        let judge = msg.member.roles.find(r => r.name === "Judge");
        let cj = msg.member.roles.find(r => r.name === "Chief Justice");
        let cp = msg.member.roles.find(r => r.name === "Chief of Police");
        let speaker = msg.member.roles.find(r => r.name === "Speaker of the House");
        let vp = msg.member.roles.find(r => r.name === "Vice President");
        let pres = msg.member.roles.find(r => r.name === "President");
        if (!officer && !congress && !judge && !cj && !cp && !speaker && !vp && !pres) 
            return msg.channel.send("You are currently unable to resign. If you are in a position " + 
                                    "which you believe you should be able to resign, please contact Sperg.");
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
        if (vp) {
            pos = "Vice President";
        }
        if (pres) {
            pos = "President";
        }
        console.log(pos);
        msg.channel.send("Resigning from " + pos + "...")
            .then(m => {
                msg.member.removeRole(msg.guild.roles.find(r => r.name === pos))
                    .catch(console.error);
                resign.setDescription(`${msg.member.displayName}, you have successfully resigned ` +
                                      `from the position of ${pos}.`)
                    .setFooter(`Resigned from ${pos}`);
                bot.logEmbed.setTitle("Action: Resign")
                    .addField("Perpetrator", msg.member.user.tag)
                    .addField("Position", pos);
                bot.logs.send(bot.logEmbed);
                m.delete();
                msg.channel.send(resign);
            });
    }
};
