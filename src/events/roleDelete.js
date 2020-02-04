module.exports = (bot, r) => {
    bot.logsEmbed.setDescription("")
    .setTitle("")
    .fields=[];
    const logs = r.guild.channels.find(r => r.name === ("logs"));
    if (logs) {
        bot.logsEmbed.setTitle("Action: Delete Role")
            .addField("Name", r.name)
            .addField("Position", r.calculatedPosition)
            .addField("Hex", r.hexColor)
            .addField("IDs", "```Role ID: " + r.id + "```");
        logs.send(bot.logsEmbed);
    }
}