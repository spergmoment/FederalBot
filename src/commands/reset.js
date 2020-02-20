exports.run = (msg, bot, args) => {
    if (msg.member.roles.find(r => r.name === "Bot Owner")) {
        msg.delete.then(async m => {
            msg.channel.send("Stopping process.");
            process.exitCode = 0;
        });
    }
};
