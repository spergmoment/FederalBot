exports.run = (msg, bot, args) => {
    let start = Date.now();
      console.log(start);
        msg.channel.send("```API Ping: " + bot.ping + "```")
            .then(async ms => {
              console.log(msg.createdTimestamp);
              await ms.edit("```API Ping: " + bot.ping + "\nClient Ping: " + (start - msg.createdTimestamp) + "```");
            });
}
