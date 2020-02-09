module.exports = (bot, g, m) => {
    const logs = g.channels.find(r => r.name === ("logs"));
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
        .setDescription("")
        .setTitle("");
    const entry = g.fetchAuditLogs({ type: 22 }).then(audit => {
        const e = audit.entries.first();
        if (logs) {
            logsEmbed.setTitle("Action: Ban")
                .addField("Banned User", m.username)
                .addField("Perpetrator", e.executor.username)
                .addField("IDs", "```User ID: " + m.id + "```");
            logs.send(logsEmbed);
        }
    });
};
