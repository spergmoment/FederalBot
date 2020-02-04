module.exports = (bot, e) => {
    const logs = e.guild.channels.find(r => r.name === ("logs"));
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
    .setDescription("")
    .setTitle("")
    if (logs) {
        logsEmbed.setTitle("Action: Create Emoji")
            .addField("Emoji Name", e.name)
            .addField("URL", e.url)
            .addField("IDs", "```Emoji ID: " + e.id + "```");
        logs.send(logsEmbed);
    }
}