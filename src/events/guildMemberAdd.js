module.exports = (bot, mem) => {
    mem.guild.fetchInvites()
        .then(guildInvites => {
            const ei = bot.invites[mem.guild.id];
            bot.invites[mem.guild.id] = guildInvites;
            const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
            const inviter = bot.users.get(invite.inviter.id);
            const logs = mem.guild.channels.find(r => r.name === ("logs"));
            const Discord = require("discord.js");
            const logsEmbed = new Discord.RichEmbed()
                .setDescription("")
                .setTitle("")
            if (logs) {
                logsEmbed.setTitle("User Joined")
                    .addField("User", mem.user.tag)
                    .addField("Avatar URL", mem.user.avatarURL)
                    .addField("Account Creation Date", bot.format(mem.user.createdAt))
                    .addField("Time Joined", bot.format(mem.joinedAt))
                    .addField("Invite Used", `${invite.code}, created by ${inviter.tag}, used ${invite.uses} times.`)
                    .addField("IDs", `\`\`\`User: ${mem.user.id}\nInviter: ${inviter.id}\`\`\``);
                logs.send(logsEmbed);
            }
        });
}
