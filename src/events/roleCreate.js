module.exports = (bot, r) => {
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
        .setDescription("")
        .setTitle("");
    const logs = r.guild.channels.find(r => r.name === ("logs"));
    const entry = r.guild.fetchAuditLogs({ type: 30 }).then(audit => {
        const e = audit.entries.first();
        if (logs) {
            logsEmbed.setTitle("Action: Create Role")
                .addField("Name", r.name)
                .addField("Position", r.calculatedPosition)
                .addField("Hex", r.hexColor)
                .addField("Perpetrator", e.executor.username)
                .addField("IDs", "```Role ID: " + r.id + "```");
            logs.send(logsEmbed);
        }
    });
};
