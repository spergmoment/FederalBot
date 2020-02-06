module.exports = (bot, e) => {
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
    .setDescription("")
    .setTitle("")
    const logs = e.guild.channels.find(r => r.name === ("logs"));
    const entry = e.guild.fetchAuditLogs({type: 61}).then(audit => audit.entries.first());
    if (logs) {
        logsEmbed.setTitle("Action: Delete Emoji")
            .addField("Emoji Name", e.name)
            .addField("URL", e.url)
            .addField("Author", entry.executor.username)
            .addField("IDs", "```Emoji ID: " + e.id + "```");
        logs.send(logsEmbed);
    }
}
