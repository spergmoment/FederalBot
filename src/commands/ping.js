exports.run = (msg, bot, args) => {
  const Discord = require("discord.js");
  const ping = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
    .setTimestamp()
    .setTitle("Choose something to get the ping to.")
    .addField("API", "Gets the ping from the API.")
    .addField("Client", "Get the ping from the Client.");
  msg.channel.send(ping);
  msg.channel.awaitMessages(m => m.author.id == msg.author.id, {
    max: 1,
    time: 30000
  }) // waits 30 secs for a message...
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
        msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
          max: 1,
          time: 30000
        }).then(async c => {
          if (collected.first().content.toLowercase() === "message") {
            let start = Date.now();
            msg.channel.send("API to Message ping: " + start - collected.first().createdTimestamp);
          } else if (collected.first().content.toLowercase() === "client") {
            msg.channel.send("API to Client ping: " + Math.round(bot.ping));
          } else if (collected.first().content.toLowercase() === "discord") {
            let start = Date.now();
            msg.channel.send("API to Your Client ping: " + start - collected.first().client.ping);
          } else {
            msg.channel.send("Sorry, that is not an available option. Try again, please.");
          }
        }).catch(() => {
          msg.channel.send("No reply after 30 seconds. Try again, please.");
        });
      } else if (collected.first().content.toLowerCase() === "client") {
        const ping2 = new Discord.RichEmbed()
          .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
          .setTimestamp()
          .setColor('RANDOM')
          .setTitle('Choose something to get the ping to.')
          .addField("Message", "Gets the ping from the Client to the message.")
          .addField("API", "Get the ping from the Client to the Discord API.")
          .addField("Discord", "Gets the ping from the Client to your client.");
        msg.channel.send(ping2);
        msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
          max: 1,
          time: 30000
        }).then(async c => {
          if (collected.first().content.toLowercase() === "message") {
            let start = Date.now();
            msg.channel.send("Client to Message ping: " + (start + (collected.first().createdTimestamp - bot.ping)));
          } else if (collected.first().content.toLowercase() === "client") {
            msg.channel.send("Client to API ping: " + Math.round(bot.ping));
          } else if (collected.first().content.toLowercase() === "discord") {
            let start = Date.now();
            msg.channel.send("Client to Your Client ping: " + (start + (collected.first().client.ping - bot.ping)));
          } else {
            msg.channel.send("Sorry, that is not an available option. Try again, please.");
          }
        }).catch(() => {
          msg.channel.send("No reply after 30 seconds. Try again, please.");
        });
      }
    })
    .catch(() => {
      msg.channel.send("No reply after 30 seconds. Try again, please.");
      return;
    });
};
