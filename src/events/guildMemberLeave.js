module.exports = (bot, mem) => {
             mem.guild.fetchInvites()
        .then(guildInvites => {
            const ei = bot.invites[mem.guild.id];
            bot.invites[mem.guild.id] = guildInvites;
            const invite = guildInvites.find(i => ei.get(i.code)
                .uses < i.uses);
            const inviter = bot.users.get(invite.inviter.id);
            const Discord = require("discord.js");
            const logsEmbed = new Discord.RichEmbed()
            .setDescription("")
            .setTitle("")
            const logs = mem.guild.channels.find(r => r.name === ("logs"));
            if (logs) {
                logsEmbed.setTitle("User Left")
                    .addField("User", mem.user.username)
                    .addField("Avatar URL", mem.user.avatarURL)
                    .addField("Account Creation Date", mem.user.createdAt)
                    .addField("Invite Used", invite.code + " created by " + inviter.tag + ", used " + invite.uses + " times.")
                    .addField("IDs", "```User ID: " + mem.user.id + "\nInviter ID: " + inviter.id + "```");
                logs.send(logsEmbed);
            }
        });
}