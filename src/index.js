const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const config = require("./config.json");
bot.config = config;
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require((`./events/${file}`)
            .trim());
        let eventName = file.split(".")[0];
        bot.on(eventName, event.bind(null, bot));
    });
});
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}
bot.on('message', msg => {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

    const args = msg.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = bot.commands.get(commandName)
    || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    bot.logEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTimestamp()
        .setDescription("")
        .setTitle("");
    bot.logs = msg.guild.channels.find(r => r.name === "logs" && r.type === "text")
    try {
        command.execute(msg, bot, args);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
});
bot.login(config.token);