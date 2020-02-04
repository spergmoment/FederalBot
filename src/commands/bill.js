exports.run = (msg, bot, args) => {
    const Discord = require("discord.js");
    const bill = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        if (msg.member.roles.find(r => r.name === "Congress")) {
            if (args.length === 0) {
                bill.setDescription("Please enter content for the bill.");
                bill.setFooter("No message has been found.");
                msg.channel.send(bill);
            } else {
                const billMsg = args.join(" ");
                bill.setTitle("Bill in Congress by " + msg.member.displayName + ".");
                bill.setDescription(billMsg);
                bill.setFooter('Bill proposed!');
                msg.delete()
                    .catch(O_o => {});
                msg.channel.send(bill)
                    .then(async msg => {
                        try {
                            await msg.pin();
                            await msg.react(guild.emojis.find(emoji => emoji.name === "Upvote"));
                            await msg.react(guild.emojis.find(emoji => emoji.name === "Downvote"));
                            await msg.channel.send("<&" + guild.roles.find(r => r.name==="Congress").id + "> bill in <#" + guild.channels.find(c => c.name==="congress"&&c.type==="text").id + ">"); // @Congress bill in #congress
                        } catch (error) {
                            console.log(error);
                        }
                    });
                log.setTitle("Action: Create Bill");
                log.setDescription("Perpetrator: " + msg.member + "\n\Bill: " + billMsg);
                logs.send(log);
            }
        }
};