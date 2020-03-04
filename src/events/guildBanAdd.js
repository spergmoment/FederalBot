module.exports = async (bot, g, m) => {
    const logs = g.channels.find(r => r.name === ("logs"));
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
        .setDescription("")
        .setTitle("");
    const entry = await g.fetchAuditLogs({
        type: 22,
        limit: 1
    });
    const e = entry.entries.first();
    if (logs) {
        logsEmbed.setTitle("Action: Ban")
            .addField("Banned User", m.tag)
            .addField("Perpetrator", e.executor.tag)
            .addField("Time Banned", bot.dateConvert(e.createdAt))
            .addField("IDs", "```User ID: " + m.id + "```");
        logs.send(logsEmbed);
    }
};