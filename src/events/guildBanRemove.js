module.exports = async (bot, g, m) => {
    const logs = g.channels.find(r => r.name === ("logs"));
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
        .setDescription("")
        .setTitle("");
    const entry = await g.fetchAuditLogs({
        type: 23,
        limit: 1
    });
    const e = entry.entries.first();
    if (logs) {
        logsEmbed.setTitle("Unban User")
            .addField("Unbanned User", m.tag)
            .addField("Perpetrator", e.executor.tag)
            .addField("Time Unbanned", bot.format(e.createdAt))
            .addField("IDs", `\`\`\`User: ${m.id}\nPerpetrator: ${e.executor.id}\`\`\``);
        logs.send(logsEmbed);
    }
};
