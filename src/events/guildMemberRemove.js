module.exports = (bot, mem) => {
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
        .setDescription("")
        .setTitle("")
    const logs = mem.guild.channels.find(r => r.name === ("logs"));
    if (logs) {
        logsEmbed.setTitle("User Left")
            .addField("User", mem.user.username)
            .addField("Avatar URL", mem.user.avatarURL)
            .addField("Account Creation Date", mem.user.createdAt)
            .addField("IDs", "```User ID: " + mem.user.id + "```");
        logs.send(logsEmbed);
    }
}
