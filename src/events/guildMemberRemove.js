module.exports = (bot, mem) => {
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
        .setDescription("")
        .setTitle("")
    const logs = mem.guild.channels.find(r => r.name === ("logs"));
    if (logs) {
        logsEmbed.setTitle("User Left")
            .addField("User", mem.user.tag)
            .addField("Avatar URL", mem.user.avatarURL)
            .addField("Account Creation Date", bot.format(mem.user.createdAt))
            .addField("Time Left", bot.format(new Date()))
            .addField("IDs", `\`\`\`User: ${mem.user.id}\`\`\``);
        logs.send(logsEmbed);
    }
}
