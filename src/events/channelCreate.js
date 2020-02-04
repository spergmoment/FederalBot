module.exports = (bot, ch) => {
    bot.logsEmbed.setDescription("")
    .setTitle("")
    .fields=[];
    const logs = ch.guild.channels.find(r => r.name === ("logs"));
    if (logs) {
        bot.logsEmbed.setTitle("Action: Create Channel")
            .addField("Channel Name", ch.name)
            .addField("IDs", "```Channel: " + ch.id + "```");
        logs.send(bot.logsEmbed);
    }
}