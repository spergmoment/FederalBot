module.exports = (bot, g, m) => {
      logsEmbed.setDescription("")
    .setTitle("");
    logsEmbed.fields=[];
    const logs = g.channels.find(r => r.name === ("logs"));
    if (logs) {
        logsEmbed.setTitle("Action: Ban")
            .addField("Banned User", m.username)
            .addField("IDs", "```User ID: " + m.id + "```");
        logs.send(logsEmbed);
    }
}