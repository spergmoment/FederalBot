module.exports = (bot, e) => {
    const logs = e.guild.channels.find(r => r.name === ("logs"));
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
    .setDescription("")
    .setTitle("");
    const entry = e.guild.fetchAuditLogs({type: 60}).then(audit => audit.entries.first());
    if (logs) {
        logsEmbed.setTitle("Action: Create Emoji")
            .addField("Emoji Name", e.name)
            .addField("Author", entry.executor.username)
            .addField("URL", e.url)
            .addField("IDs", "```Emoji ID: " + e.id + "```");
        logs.send(logsEmbed);
    }
}
