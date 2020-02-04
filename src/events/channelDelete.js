module.exports = (bot, ch) => {
    const logs = ch.guild.channels.find(r => r.name === ("logs"));
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
    .setDescription("")
    .setTitle("")
    if (logs) {
        logsEmbed.setTitle("Action: Delete Channel")
            .addField("Channel Name", ch.name)
            .addField("IDs", "```Channel ID: " + ch.id + "```");
        send(bot.logsEmbed);
    }
}