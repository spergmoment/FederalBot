module.exports = {
    name: 'nominate',
    desc: 'For CP, CJ, or Speaker to nominate a member for Officer, Judge, and Congress respectively.',
    usage: ';nominate (member)',
    examples: ";nominate @sperg#6969 // Nominates member \"sperg#6969\" " + 
    "for Judge, Officer, or Congress.",
    extraNotes: "If you nominate someone for Congress, you must choose House or Senate. " + 
    "Have about 9 House members per Senator.",
    async execute(msg, bot, args) {
        const Discord = require("discord.js");
        let member = msg.mentions.members.first();
        if (!member) {
            msg.channel.send("Who are you nominating?");
            await msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
                    max: 1,
                    time: 30000,
                    errors: ['time']
                })
                .then(async c => {
                    const f = c.first();
                    const m = f.mentions.members.first();
                    if (m) {
                        member = m;
                    } else {
                        return msg.channel.send("Please mention a valid member.");
                    }
                })
                .catch(() => {
                    return msg.channel.send("Time limit reached, try again.");
                });
        }
        var send = (`${member.displayName} can not be nominated now. ${member.displayName} ` + 
                    " must be impeached from their current position in order to be nominated at this time.");
        // used to save space
        const nom = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL) // just embed stuff :)
            .setTimestamp()
            .setColor('RANDOM');
        let role;
        if (msg.member.roles.find(r => r.name === "Speaker of the House")) { // checks the role
            role = msg.guild.roles.find(r => r.name === "Congress"); // the role to give
        } else if (msg.member.roles.find(r => r.name === "Chief Justice")) {
            role = msg.guild.roles.find(r => r.name === "Judge");
        } else if (msg.member.roles.find(r => r.name === "Chief of Police")) {
            role = msg.guild.roles.find(r => r.name === "Officer");
        }
        if (!role) return msg.channel.send("You lack permission to use this.");
        if (!args) return msg.channel.send("Please mention someone to nominate.");
        if (member.roles.find(r => r.name === "Judge") || 
            member.roles.find(r => r.name === "Officer") || 
            member.roles.find(r => r.name === "Congress")) 
            return msg.channel.send(send);
        msg.channel.send(`Nominating ${member.displayName} for ${role.name}...`)
            .then(async m => {
                if (role.name === "Congress") {
                    msg.channel.send("Nominate for House or Senate?"); 
                    msg.channel.awaitMessages(m => m.author.id == msg.author.id, {
                            max: 1,
                            time: 30000
                        }) // waits 30 secs for a message...
                        .then(async collected => {
                            if (collected.first()
                                .content.toLowerCase() == 'house') { // ...and if its content is "house"...
                                await member.addRole(msg.guild.roles.find(r => r.name === "House")); 
                                // ...give them house!
                            } else if (collected.first()
                                .content.toLowerCase() == 'senate') { // same thing here
                                await member.addRole(msg.guild.roles.find(r => r.name === "Senate")); // ^
                            } else {
                                await msg.channel.send("Please choose either House or Senate.");
                                return;
                            }
                        })
                        .catch(() => {
                            msg.channel.send("No reply after 30 seconds. Please choose either House or Senate.");
                            return;
                        });
                }
                member.addRole(role)
                    .catch(console.error);
                nom.setDescription(`${msg.member.displayName}, you have successfully nominated ${member.displayName} ` + 
                ` for ${role.name}!`)
                    .setFooter(`Nominated ${member.displayName} for ${role}.`);
                bot.logEmbed.setTitle("Nominate")
                    .addField("User", member.user.tag)
                    .addField("Perpetrator", msg.member.user.tag)
                    .addField("Position", role.name);
                bot.logs.send(bot.logEmbed);
                m.delete();
                msg.channel.send(nom);
            });
    }
};
