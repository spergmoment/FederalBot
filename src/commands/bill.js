exports.run = (msg, bot, args) => {
    const Discord = require("discord.js");
    const bill = new Discord.RichEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
        .setTimestamp()
        .setColor('RANDOM');
    if (!msg.member.roles.find(r => r.name === "Congress") && !msg.member.roles.find(r => r.name === "Bot Owner")) 
        return msg.channel.send("You must be in Congress to use this command.");
    if (args.length === 0) return msg.channel.send("Please enter bill content.");
    msg.channel.send("Creating bill...")
        .then(async m => {
            const billMsg = args.join(" ");
            bill.setTitle("Bill in Congress by " + msg.member.displayName + ".")
                .setDescription(billMsg)
                .setFooter('Bill proposed!');
            msg.delete()
                .catch(O_o => {});
            msg.channel.send(bill)
                .then(async msg => {
                    try {
                        await msg.pin();
                        await msg.react(msg.guild.emojis.find(emoji => emoji.name === "Upvote"));
                        await msg.react(msg.guild.emojis.find(emoji => emoji.name === "Downvote"));
                        await msg.channel.send("<&" + msg.guild.roles.find(r => r.name === "Congress")
                            .id + "> bill in <#" + msg.guild.channels.find(c => c.name === "congress" && c.type === "text")
                            .id + ">"); // @Congress bill in #congress
                    } catch (error) {
                        console.log(error);
                    }
                });
        });
};
