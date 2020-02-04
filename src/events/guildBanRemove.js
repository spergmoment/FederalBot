module.exports = (bot, g, m) => {
    bot.logsEmbed.setDescription("")
    .setTitle("")
    .fields=[];
    const logs = g.channels.find(r => r.name === ("logs"));
    if (logs) {
        bot.logsEmbed.setTitle("Action: Unban")
            .addField("Unbanned User", m.username)
            .addField("IDs", "```User ID: " + m.id + "```");
        logs.send(bot.logsEmbed);
    }
}