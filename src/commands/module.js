exports.run = (msg, bot, args) => {
    const Discord = require("discord.js");
    if(args[0]) let d = args[0].toLowerCase();
    const module = new Discord.RichEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
        .setTimestamp()
        .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
            .toString(16)
            .substr(1, 6));
    if (args.length === 0) {
        module.setTitle("Modules available:");
        module.setDescription("Owners, Admins, Branches, Congress,\nPolice, Judicial, General");
        module.setFooter('Modules available');
    } else if (d === "owners" || d === "owner") {
        module.setTitle("Module Owners:");
        module.setDescription("Update, Elect, Reset, Eval");
        module.setFooter('Owners Module');
    } else if (d === "admins" || d === "admin") {
        module.setTitle("Module Admins:");
        module.setDescription("Update, Poll");
        module.setFooter('Admins Module');
    } else if (d === "branches") {
        module.setTitle("Module Branches:");
        module.setDescription("Nominate, Impeach, Resign");
        module.setFooter('Branches Module');
    } else if (d === "congress") {
        module.setTitle("Module Congress:");
        module.setDescription("Bill, Resign, Clear");
        module.setFooter('Congress Module');
    } else if (d === "police" || d === "officers") {
        module.setTitle("Module Police:");
        module.setDescription("Detain");
        module.setFooter('Police Module');
    } else if (d === "judicial" || d === "judges") {
        module.setTitle("Module Judicial:");
        module.setDescription("Approve, Guilty, Innocent, Mistrial");
        module.setFooter('Judicial Module');
    } else if (d === "general") {
        module.setTitle("Module General:");
        module.setDescription("Help, Modules, ping");
        module.setFooter('General Module');
    } else {
        module.setDescription("Invalid module!");
        module.setFooter('Error in syntax: module "' + args.join(" ") + '" is invalid or not available.');
    }
    msg.channel.send(module);
};
