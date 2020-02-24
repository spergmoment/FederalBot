exports.run = (msg, bot, args) => {
    msg.channel.send("Getting module " + args[0] + "...").then(async m => {
        const Discord = require("discord.js");
        if (args[0]) var d = args[0].toLowerCase();
        const module = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('RANDOM');
        if (args.length === 0) {
            module.setTitle("Modules available:")
            .setDescription("Owners, Admins, Branches, Congress,\nPolice, Judicial, General")
            .setFooter('Modules available');
        } else if (d === "owners" || d === "owner") {
            module.setTitle("Module Owners:")
            .setDescription("Update, Elect, Reset, Eval")
            .setFooter('Owners Module');
        } else if (d === "admins" || d === "admin") {
            module.setTitle("Module Admins:")
            .setDescription("Update, Poll")
            .setFooter('Admins Module');
        } else if (d === "branches") {
            module.setTitle("Module Branches:")
            .setDescription("Nominate, Impeach, Resign")
            .setFooter('Branches Module');
        } else if (d === "congress") {
            module.setTitle("Module Congress:")
            .setDescription("Bill, Resign, Clear")
            .setFooter('Congress Module');
        } else if (d === "police" || d === "officers") {
            module.setTitle("Module Police:")
            .setDescription("Detain")
            .setFooter('Police Module');
        } else if (d === "judicial" || d === "judges") {
            module.setTitle("Module Judicial:")
            .setDescription("Approve, Guilty, Innocent, Mistrial")
            .setFooter('Judicial Module');
        } else if (d === "general") {
            module.setTitle("Module General:")
            .setDescription("Help, Modules, Ping")
            .setFooter('General Module');
        } else {
            module.setDescription("Invalid module!")
            .setFooter('Error in syntax: module "' + args.join(" ") + '" is invalid or not available.');
        }
        msg.channel.send(module);
        m.delete();
    });
};
