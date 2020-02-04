module.exports = (bot, e) => {
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
    .setDescription("")
    .setTitle("")
    const logs = e.guild.channels.find(r => r.name === ("logs"));
    if (logs) {
        logsEmbed.setTitle("Action: Delete Emoji")
            .addField("Emoji Name", e.name)
            .addField("URL", e.url)
            .addField("IDs", "```Emoji ID: " + e.id + "```");
        logs.send(logsEmbed);
    }
}