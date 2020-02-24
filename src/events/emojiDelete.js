module.exports = (bot, e) => {
    const logs = e.guild.channels.find(r => r.name === ("logs"));
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
        .setDescription("")
        .setTitle("");
    const entry = e.guild.fetchAuditLogs({ type: 62 }).then(audit => {
        const en = audit.entries.first();
        if (logs) {
            logsEmbed.setTitle("Action: Delete Emoji")
                .addField("Emoji Name", e.name)
                .addField("Author", en.executor.tag)
                .addField("URL", e.url)
                .addField("Time Created", bot.dateConvert(e.createdAt))
                .addField("Time Deleted", bot.dateConvert(en.createdAt))
                .addField("IDs", "```Emoji ID: " + e.id + "```");
            logs.send(logsEmbed);
        }
    });
}
