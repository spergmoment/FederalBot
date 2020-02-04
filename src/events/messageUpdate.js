module.exports = (bot, o, n) => {
    botlogsEmbed.setDescription("")
    .setTitle("")
    .fields=[];
    const logs = o.guild.channels.find(r => r.name === ("logs"));
    if (logs && o.content !== n.content) {
        bot.logsEmbed.setTitle("Action: Edit Message")
            .addField("User", o.author.username)
            .addField("Was", o.content)
            .addField("Now Is", n.content)
            .addField("IDs", "```Message ID: " + o.id + "\nUser ID: " + o.author.id + "```");
        logs.send(logsEmbed);
    }
}