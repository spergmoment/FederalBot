module.exports = async (bot, e) => {
    const logs = e.guild.channels.find(r => r.name === ("logs"));
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
        .setDescription("")
        .setTitle("");
    const entry = await e.guild.fetchAuditLogs({
        type: 60,
        limit: 1
    });
    const en = entry.entries.first();
    if (logs) {
        logsEmbed.setTitle("Action: Create Emoji")
            .addField("Emoji Name", e.name)
            .addField("Author", en.executor.tag)
            .addField("URL", e.url)
            .addField("Time Created", bot.dateConvert(e.createdAt))
            .addField("IDs", "```Emoji ID: " + e.id + "```");
        logs.send(logsEmbed);
    }
};