module.exports = (bot, o, n) => {
    if(!o.content||!n.content) return;
    if(o.author.bot||n.author.bot) return;
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
    .setDescription("")
    .setTitle("")
    const logs = o.guild.channels.find(r => r.name === ("logs"));
    if (logs && o.content !== n.content) {
        logsEmbed.setTitle("Action: Edit Message")
            .addField("User", o.author.tag)
            .addField("Was", o.content)
            .addField("Now Is", n.content)
            .addField("Time Sent", bot.dateConvert(o.createdAt))
            .addField("Time Edited", bot.dateConvert(n.editedAt))
            .addField("IDs", "```Message ID: " + o.id + "\nUser ID: " + o.author.id + "```");
        logs.send(logsEmbed);
    }
}
