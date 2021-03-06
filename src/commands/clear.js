module.exports = {
    name: 'clear',
    desc: 'Clears out messages in a channel.',
    usage: ';clear (amount)',
    examples: ';clear 50 // Clears 50 messages. \n\n;clear // Defaults to 20.',
    extraNotes: "Do not abuse this command. API requests can cap, " + 
    "and if you cap too many times, I might get the bot disabled.",
    aliases: ['purge'],
    async execute(msg, bot, args) {
        if (!msg.member.roles.find(r => r.name === "Congress") && !msg.member.roles.find(r => r.name === "Bot Owner"))
            return msg.channel.send("You must be in Congress to use this command.");
        await msg.delete();
        if (isNaN(args[0])) return msg.channel.send("The input isn't a number.");
        await msg.channel.send("Clearing...")
            .then(async m => {
                try {
                    if (args[0]) {
                        await msg.channel.fetchMessages({
                                limit: parseInt(args[0], 10) + 1,
                            })
                            .then(async msgs => {
                                await msg.channel.bulkDelete(msgs)
                                    .catch(error => console.log(error.stack));
                            });
                        await m.edit(`Cleared ${args[0]} messages.`)
                            .then(async m => {
                                setTimeout(async () => {
                                    await m.delete();
                                }, 2500);
                            });
                    } else {
                        await msg.channel.fetchMessages({
                                limit: 21,
                            })
                            .then(async msgs => {
                                await msg.channel.bulkDelete(msgs)
                                    .catch(error => console.log(error.stack));
                            });
                        await m.edit("Cleared 20 messages.")
                            .then(async m => {
                                await m.delete(2500)
                            });
                    }
                } catch (err) {
                    msg.channel.send(`An error occurred:\n${err}`).then(m => m.delete(2500));
                }
            });
    }
};