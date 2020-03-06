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
            .addField("Time Sent", bot.format(o.createdAt))
            .addField("Time Edited", bot.format(n.editedAt))
            .addField("IDs", `\`\`\`Message: ${n.id}\nUser: ${n.author.id}\`\`\``);
        logs.send(logsEmbed);
    }
}
