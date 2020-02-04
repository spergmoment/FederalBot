exports.run = (msg, bot, args) => {
            if (msg.member.roles.find(r => r.name === "Bot Owner")) {
            process.exit();
        }
};