module.exports = (bot, g, m) => {
    const logs = g.channels.find(r => r.name === ("logs"));
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
        .setDescription("")
        .setTitle("");
    const entry = g.fetchAuditLogs({ type: 23 }).then(audit => {
        const e = audit.entries.first();
        if (logs) {
            logsEmbed.setTitle("Action: Unban")
                .addField("Unbanned User", m.username)
                .addField("Perpetrator", e.executor.username)
                .addField("Time Unbanned", bot.dateConvert(e.createdAt))
                .addField("IDs", "```User ID: " + m.id + "```");
            logs.send(logsEmbed);
        }
    });
};
