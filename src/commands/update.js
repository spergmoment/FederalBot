module.exports = {
    name: 'update',
    desc: 'For Bot Owners/Admins to display any updates to the bot.',
    usage: ';update (update content)',
    examples: ";update Added a new command, ;update, for Bot Owners/Admins to display updates. " +
    "// the bot will send the update. \n\n;update 1 // There are 3 predefined updates: " +
    "Bug fixes, code cleanup, and Permissions object updates.",
    execute(msg, bot, args) {
        var updates = [
        'Fixed some bugs.',
        'Cleaned up various areas in code.',
        'Fixed or changed permissions.'
    ];
        const Discord = require("discord.js");
        const update = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor("RANDOM");
        if (msg.member.roles.find(r => r.name === "Bot Owner") || msg.member.roles.find(r => r.name === "Bot Admin")) {
            msg.delete();
            update.setTitle("New update:");
            if (args[0] === '1' || args[0] === '2' || args[0] === '3') {
                update.setDescription(updates[args[0] - 1]);
            } else {
                update.setDescription(args.join(" "));
            }
            update.setFooter('Bot update!');
        } else {
            update.setDescription("Only a bot owner or admin may use this command.")
                .setFooter('You lack the Bot Owner and Bot Admin roles in the Permissions Object.');
        }
        msg.channel.send(update);
    }
};