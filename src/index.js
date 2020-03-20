/* jshint esversion: 8 */
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const config = require("./config.json");
const Sequelize = require('sequelize');
bot.sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: true,
    // SQLite only
    storage: 'misdemeanors.sqlite',
});
bot.Misdemeanors = bot.sequelize.define('misdemeanors', {
    user: {
        type: Sequelize.STRING,
        unique: true
    },
    username: Sequelize.STRING,
    guild: Sequelize.STRING,
    misdemeanors: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
});
bot.config = config;
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require((`./events/${file}`).trim());
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
bot.once('ready', () => {
    bot.Misdemeanors.sync();
    bot.format = function (x) {
        let months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        let weeks = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        let time = x;
        if (time.toString().indexOf("Invalid") !== -1) return "Couldn't convert the given date.";
        let yr = time.getFullYear();
        let mon = time.getMonth();
        mon = months[mon];
        let day = time.getDate();
        let hr = time.getHours();
        let min = time.getMinutes();
        let sec = time.getSeconds();
        let week = time.getDay();
        week = weeks[week];
        if (hr < 10) {
            hr = "0" + hr.toString().charAt(0);
        }
        if (min < 10) {
            min = "0" + min.toString().charAt(0);
        }
        if (sec < 10) {
            sec = "0" + sec.toString().charAt(0);
        }
        return week + ", " + mon + " " + day + ", " + yr + ", at " + hr + ":" + min + ":" + sec;
    };
    bot.laws = [
        "**Law 1: Spam**\nSending an unreasonably large amount of messages in a short amount of time. (Misdemeanor)",
        "**Law 2: Raid**\nSending a massive amount of messages in a very short time, or otherwise participating in a large attack on our server, is prohibited. (Banishment)",
        "**Law 3: Alt**\nUsing more than a single alternative account, or otherwise using an alt to your advantage, is prohibited. (Felony)",
        "**Law 4: Misconduct**\nMisuse of government powers is hereby prohibited. (Misdemeanor, Felony, or Impeachment depending on severity)",
        "**Law 5: NSFW/L**\nSending NSFW outside of ${guild.channels.find(c=>c.name==='nsfw')}, or NSFL absolutely anywhere is prohibited. (Felony)",
        "**Law 6: Slander**\Attempting to damage someone's reputation in a serious, harmful, or aggressive nature is prohibited. (Felony)",
        "**Law 7: Corruption**\nGovernment officials participating in dishonest actions, bribery, or otherwise seriously threatening others in a way that directly benefits themselves is very strictly prohibited. (Felony, Impeachment)",
        "**Law 8: Obstruction**\nDestroying evidence in any such way that it can be used for your own advantage is strictly prohibited. (Automatic loss of case, Impeachment (Both I/A))",
        "**Law 9: Invite**\nPurposefully sending any valid invite link to any server other than our own is prohibited. (Misdemeanor)",
        "**Law 10: Ping**\nPinging @everyone without permission, pinging someone with no valid reasoning, or mass pinging is prohibited. (Misdemeanor)",
        "**Law 11: Impersonation**\nImpersonating anyone in a serious manner is prohibited. (Misdemeanor)"
    ];
    bot.rights = [
        "**Right 1**\n The people have the right to freedom of speech.",
        "**Right 2**\n The executive branch shall not suppress any protest demanding the government for a redress of grievances.",
        "**Right 3**\n The accused has the right to cross-examine witnesses and dispute evidence in a fair, public and speedy process with a qualified and earnest attorney.",
        "**Right 4**\n For some of the lesser of crimes, the defendant must have been convicted for at least three misdemeanors of the same crime before a prison sentence may be ruled.",
        "**Right 5**\n The people have the right to remain silent.",
        "**Right 6**\n All communications during governmental proceedings must be readily available to the public.",
        "**Right 7**\n The accused shall not be prosecuted for the same crime more than once.",
        "**Right 8**\n The people may only be prosecuted for a crime within two weeks of the date it was committed.",
        "**Right 9**\n The people shall not be subject to vague or unreasonable legislation, including \"annoying\", pushing, or otherwise unlawful behavior against someone.",
        "**Right 10**\n Individual conduct in a court proceeding shall have no bearing on the verdict."
    ];
    const wait = require('util').promisify(setTimeout);
    bot.invites = [];
    wait(1000);
    bot.user.setActivity('with your feelings');
    bot.guilds.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            bot.invites[g.id] = guildInvites;
        });
    });
});
bot.on('message', async msg => {
    if (msg.channel.type === "dm") {
        if (!msg.content.includes(";help") && !msg.content.includes(";ticket") && msg.author.id !== "670803998432952320" && msg.author.id !== "628041675851300864" && msg.author.id !== bot.user.id) {
            return msg.channel.send("Hey! If you need any help, please do `;ticket` and I'll relay your help to the bot owners!");
        } else if (msg.content.includes(";help") || msg.content.includes(";ticket")) {
            var h;
        } else {
            return;
        }
    }
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;
    const args = msg.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    bot.logEmbed = new Discord.RichEmbed().setColor('RANDOM').setTimestamp().setDescription("").setTitle("");
    if (msg.guild) bot.logs = msg.guild.channels.find(r => r.name === "logs" && r.type === "text");
    try {
        command.execute(msg, bot, args);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
});
bot.login(config.token);