exports.run = (msg, bot, args) => {
            if (msg.member.roles.find(r => r.name === "Bot Owner")) {
            msg.channel.send("Input```" + args.join(" ") + "```Returns```" + eval(args.join(" ")) + "```")
                .catch(async er => {
                    await msg.channel.send("Input```" + args.join(" ") + "```Error```" + er + "```");
                });
        }
};
