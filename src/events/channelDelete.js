module.exports = async (bot, ch) => {
    if (ch.type === "dm") return;
    const logs = ch.guild.channels.find(r => r.name === ("logs"));
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
        .setDescription("")
        .setTitle("");
    const entry = await ch.guild.fetchAuditLogs({
        type: 12,
        limit: 1
    });
    const e = entry.entries.first();
    if (logs) {
        logsEmbed.setTitle("Delete Channel")
            .addField("Channel Name", ch.name)
            .addField("Perpetrator", e.executor.tag)
            .addField("Time Created", bot.format(ch.createdAt))
            .addField("Time Deleted", bot.format(e.createdAt))
            .addField("IDs", `\`\`\`Channel: ${ch.id}\nPerpetrator: ${e.executor.id}\`\`\``);
        logs.send(logsEmbed);
    }
};
