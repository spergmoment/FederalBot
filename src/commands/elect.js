exports.run = (msg, bot, args) => {
    const Discord = require("discord.js");
    if (args.length < 4) return msg.channel.send("Please insert more arguments.")
    let num = args[0]; // this saves some space too
    let pos = args[1];
    if (!msg.member.roles.find(r => r.name === "President") && !msg.member.roles.find(r => r.name === "Bot Owner")) 
  return msg.channel.send("You must be the President or a Bot Owner to use this command.");
    msg.delete();
    msg.channel.send("Creating election...")
        .then(async ms => {
            let electTo = "Yo @everyone, it's election time. Vote here for the " + pos + ". Note: Using alts to vote is *not* allowed and will get you disqualified.";
            for (let i = 0; i < num; i++) {
                electTo += ("\n\n" + (i + 1) + ": " + args[i + 2]); // basically the number of the candidate
            }
            msg.channel.send(electTo)
                .then(async msg => {
                    ms.delete();
                    msg.channel.send("Adding reactions...")
                        .then(async m => {
                            try {
                                await msg.react("1️⃣"); // same with before
                                await msg.react("2️⃣");
                                if (num > 2) {
                                    await msg.react("3️⃣");
                                }
                                if (num > 3) {
                                    await msg.react("4️⃣");
                                }
                                if (num > 4) {
                                    await msg.react("5️⃣");
                                }
                                if (num > 5) {
                                    await msg.react("6️⃣");
                                }
                                if (num > 6) {
                                    await msg.react("7️⃣");
                                }
                                if (num > 7) {
                                    await msg.react("8️⃣");
                                }
                                if (num > 8) {
                                    await msg.react("9️⃣");
                                } // without await, these got all jumbled up
                                await m.delete();
                            } catch (error) {
                                console.log(error);
                            }
                        });
                });
        });
};
