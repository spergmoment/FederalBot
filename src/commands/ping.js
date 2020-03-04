module.exports = {
    name: 'ping',
    desc: 'Shows the API/Client ping to the message, API/Client, or your client.',
    usage: ';ping, (API, Client), (Message, API/Client, Discord)',
    execute(msg, bot, args) {
        const Discord = require("discord.js");
        const ping = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setTitle("Choose something to get the ping from.")
            .addField("API", "Gets the ping from the API.")
            .addField("Client", "Get the ping from the Client.");
        msg.channel.send(ping);
        var filter = m => m.author.id == msg.author.id;
        msg.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            })
            .then(async collected => {
                if (collected.first()
                    .content.toLowerCase() == 'api') {
                    const ping2 = new Discord.RichEmbed()
                        .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
                        .setTimestamp()
                        .setColor('RANDOM')
                        .setTitle('Choose something to get the ping to.')
                        .addField("Message", "Gets the ping from Discord API to the message.")
                        .addField("Client", "Get the ping from the API to the Client.")
                        .addField("Discord", "Gets the ping from the API to your client.");
                    msg.channel.send(ping2);
                    msg.channel.awaitMessages(filter, {
                            max: 1,
                            time: 30000,
                            errors: ['time']
                        })
                        .then(async collected => {
                            if (collected.first()
                                .content.toLowerCase() === "message") {
                                let start = Date.now();
                                msg.channel.send("Pinging...")
                                    .then(m => {
                                        m.edit(`API to Message ping: ${start - collected.first().createdTimestamp}`);
                                    });
                            } else if (collected.first()
                                .content.toLowerCase() === "client") {
                                msg.channel.send("Pinging...")
                                    .then(m => {
                                        m.edit("API to Client ping: " + Math.round(bot.ping));
                                    });
                            } else if (collected.first()
                                .content.toLowerCase() === "discord") {
                                msg.channel.send("Pinging...")
                                    .then(m => {
                                        m.edit(`API to Your Client ping: ${Math.round(collected.first().client.ping)}`);
                                    });
                            } else {
                                msg.channel.send("This isn't an option!");
                            }
                        })
                        .catch(() => {
                            msg.channel.send("No reply after 30 seconds. Please try again.");
                        });
                } else if (collected.first()
                    .content.toLowerCase() === "client") {
                    const ping2 = new Discord.RichEmbed()
                        .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
                        .setTimestamp()
                        .setColor('RANDOM')
                        .setTitle('Choose something to get the ping to.')
                        .addField("Message", "Gets the ping from the Client to the message.")
                        .addField("API", "Get the ping from the Client to the Discord API.")
                        .addField("Discord", "Gets the ping from the Client to your client.");
                    msg.channel.send(ping2);
                    msg.channel.awaitMessages(filter, {
                            max: 1,
                            time: 30000,
                            errors: ['time']
                        })
                        .then(async collected => {
                            if (collected.first()
                                .content.toLowerCase() === "message") {
                                let start = Date.now();
                                msg.channel.send("Pinging...")
                                    .then(m => {
                                        m.edit(`Client to Message ping: ${Math.round(Date.now() - start)}`);
                                    });
                            } else if (collected.first()
                                .content.toLowerCase() === "api") {
                                msg.channel.send("Pinging...")
                                    .then(m => {
                                        m.edit(`Client to API ping: ${Math.round(bot.ping)}`);
                                    });
                            } else if (collected.first()
                                .content.toLowerCase() === "discord") {
                                let start = Date.now();
                                msg.channel.send("Pinging...")
                                    .then(m => {
                                        m.edit("Client to Your Client ping: " +
                                        Math.round(Math.abs(collected.first().client.ping - 
                                                                      (start - collected.first().createdTimestamp))));
                                    });
                            } else {
                                msg.channel.send("This isn't an option!");
                            }
                        })
                        .catch(() => {
                            msg.channel.send("No reply after 30 seconds. Please try again.");
                        });
                } else {
                    msg.channel.send("This isn't an option!");
                }
            })
            .catch(() => {
                msg.channel.send("No reply after 30 seconds. Please try again.");
            });
    }
};
