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
    bot.logs = msg.guild.channels.find(ch => ch.name === 'logs' && ch.type == "text"); // logs channel
    bot.logEmbed = new Discord.RichEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
        .setTimestamp()
        .setColor('RANDOM'); // the logs embed lol
    if (!cmd) return;
    cmd.run(msg, bot, args);
};
