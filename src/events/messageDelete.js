module.exports = (bot, m) => {
    bot.logsEmbed.setDescription("")
    .setTitle("")
    .fields=[];
    const logs = m.guild.channels.find(r => r.name === ("logs"));
    if (logs) {
        bot.logsEmbed.setTitle("Deleted Message")
            .addField("Author", m.author.username)
            .addField("Content", m.content)
            .addField("Channel", m.channel.name)
            .addField("Message Time", m.createdAt)
            .addField("IDs", "```Message ID: " + m.id + "\nUser ID: " + m.author.id + "```");
        logs.send(bot.logsEmbed);
    }
}