const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const bot = new Discord.Client();
const config = require("./config.json");
bot.config = config;
bot.logsEmbed = new Discord.RichEmbed()
.setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
    .toString(16)
    .substr(1, 6))
.setTimestamp()
.setDescription("")
.setTitle("")
.fields=[];

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require((`./events/${file}`).trim());
    let eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null,  bot));
  });
});

bot.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require((`./commands/${file}`).trim());
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    bot.commands.set(commandName, props);
  });
});

bot.login(config.token);
