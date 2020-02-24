module.exports = (bot, m) => {
    if(!m.content) return;
    if(m.author.bot) return;
    if(m.content.startsWith(";")) return;
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
    .setDescription("")
    .setTitle("");
    const logs = m.guild.channels.find(r => r.name === ("logs"));
    if (logs) {
        logsEmbed
        .setTitle("Deleted Message")
            .addField("Author", m.author.tag)
            .addField("Content", m.content)
            .addField("Channel", m.channel.name)
            .addField("Message Time", bot.dateConvert(m.createdAt))
            .addField("Time Deleted", bot.dateConvert(Date()))
            .addField("IDs", "```Message ID: " + m.id + "\nUser ID: " + m.author.id + "```");
        logs.send(logsEmbed);
    }
}