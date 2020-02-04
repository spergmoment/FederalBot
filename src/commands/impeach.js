exports.run = (msg, bot, args) => {
    const Discord = require("discord.js");
    let member = msg.mentions.members.first();
        let send = ("You either do not have the correct role for you to impeach " + member.user.username + ", or another error has occured. Please try again later."); // saves some space
        const peach = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        if (args) {
            let role = undefined;
            if (msg.member.roles.find(r => r.name === "Speaker of the House")) {
                role = msg.guild.roles.find(r => r.name === "Congress");
            }
            if (msg.member.roles.find(r => r.name === "Chief Justice")) {
                role = msg.guild.roles.find(r => r.name === "Judge");
            }
            if (msg.member.roles.find(r => r.name === "Chief of Police")) {
                role = msg.guild.roles.find(r => r.name === "Officer");
            }
            if (role) {
                if (member.roles.find(r => r.name === role.name)) {
                    member.removeRole(role)
                        .catch(console.error); // lol
                        if(role.name==="Congress") {
                          if(member.roles.find(r => r.name==="House")) {
                            member.removeRole(msg.guild.roles.find(r => r.name==="House"));
                          }
                          if(member.roles.find(r => r.name==="Senate")) {
                            member.removeRole(msg.guild.roles.find(r => r.name==="Senate"));
                          }
                        }
                    peach.setDescription(msg.member.displayName + ", I have impeached " + member.displayName + " from " + role.name + ".");
                    peach.setFooter('Impeached ' + member.displayName + ' from ' + role.name + ".");
                    bot.logEmbed.setTitle("Action: Impeach");
                    bot.logEmbed.setDescription("User: " + member.displayName + "\n\nPerpetrator: " + msg.member.displayName + "\n\nPosition: " + role.name);
                    bot.logs.send(bot.logEmbed);
                } else {
                    peach.setDescription(send);
                }
            } else {
                peach.setDescription("You lack the proper role to use this command.")
                    .setFooter("You lack a branch role in the Permissions Object.");
            }
        } else {
            peach.setDescription("Args not found. Please resend the command with proper arguments.")
            .setFooter('Couldn\'t find args.');
        }
        msg.channel.send(peach);
};