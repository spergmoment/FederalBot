module.exports = (bot, e) => {
    bot.logsEmbed.setDescription("")
    .setTitle("")
    .fields=[];
    const logs = e.guild.channels.find(r => r.name === ("logs"));
    if (logs) {
        bot.logsEmbed.setTitle("Action: Create Emoji")
            .addField("Emoji Name", e.name)
            .addField("URL", e.url)
            .addField("IDs", "```Emoji ID: " + e.id + "```");
        logs.send(bot.logsEmbed);
    }
}