module.exports = (bot, r) => {
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
    .setDescription("")
    .setTitle("")
    const logs = r.guild.channels.find(r => r.name === ("logs"));
    if (logs) {
        logsEmbed.setTitle("Action: Delete Role")
            .addField("Name", r.name)
            .addField("Position", r.calculatedPosition)
            .addField("Hex", r.hexColor)
            .addField("IDs", "```Role ID: " + r.id + "```");
        logs.send(logsEmbed);
    }
}