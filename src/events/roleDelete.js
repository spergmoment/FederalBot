module.exports = async (bot, r) => {
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
        .setDescription("")
        .setTitle("");
    const logs = r.guild.channels.find(r => r.name === ("logs"));
    const entry = await r.guild.fetchAuditLogs({
        type: 32,
        limit: 1
    });
    const e = entry.entries.first();
    if (logs) {
        logsEmbed.setTitle("Delete Role")
            .addField("Name", r.name)
            .addField("Position", r.calculatedPosition)
            .addField("Hex", r.hexColor)
            .addField("Perpetrator", e.executor.tag)
            .addField("Time Created", bot.format(r.createdAt))
            .addField("Time Deleted", bot.format(Date()))
            .addField("IDs", `\`\`\`Role: ${r.id}\`\`\``);
        logs.send(logsEmbed);
    }
};
