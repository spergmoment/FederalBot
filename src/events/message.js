module.exports = (bot, msg) => {
    const Discord = require("discord.js");
    if (msg.author.bot) return;
    if (msg.content.indexOf(bot.config.prefix) !== 0) return;
    const args = msg.content.slice(bot.config.prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift()
        .toLowerCase();
    const cmd = bot.commands.get(command);
    var guild = msg.guild; // shortens code
    bot.logs = guild.channels.find(ch => ch.name === 'logs' && ch.type == "text"); // logs channel
    bot.logEmbed = new Discord.RichEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
        .setTimestamp()
        .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
            .toString(16)
            .substr(1, 6)); // the logs embed lol
    if (!cmd) return;
    cmd.run(bot, msg, args);
}; 
