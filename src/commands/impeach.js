module.exports = {
    name: 'impeach',
    desc: 'For CP, CJ, or Speaker to impeach a member from Officer, Judge, or Congress respectively.',
    usage: ';impeach (member)',
    examples: ';impeach @sperg#6969 // Impaches member \"sperg#6969\" ' + 
    "from Judge, Officer, or Congress.",
    extraNotes: 'Unlike ;nominate, Congress members are ' + 
    "automatically impeached from their respective house.",
    aliases: ['peach'],
    async execute(msg, bot, args) {
        const Discord = require("discord.js");
        let member = msg.mentions.members.first();
        if (!member) {
            msg.channel.send("Who are you impeaching?");
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
        const peach = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('RANDOM');
        let role;
        if (msg.member.roles.find(r => r.name === "Speaker of the House")) {
            role = msg.guild.roles.find(r => r.name === "Congress");
        }
        if (msg.member.roles.find(r => r.name === "Chief Justice")) {
            role = msg.guild.roles.find(r => r.name === "Judge");
        }
        if (msg.member.roles.find(r => r.name === "Chief of Police")) {
            role = msg.guild.roles.find(r => r.name === "Officer");
        }
        if (!role) return msg.channel.send("You lack permission to use this role.");
        if (!member.roles.find(r => r.name === role.name)) 
            return msg.channel.send("You either do not have the correct role for you to impeach " + 
            `${member.user.username}, or another error has occured. Please try again later.`);
        msg.channel.send(`Impeaching ${member.displayName}...`)
            .then(async m => {
                member.removeRole(role)
                    .catch(console.error); // lol
                if (role.name === "Congress") {
                    if (member.roles.find(r => r.name === "House")) {
                        member.removeRole(msg.guild.roles.find(r => r.name === "House"));
                    }
                    if (member.roles.find(r => r.name === "Senate")) {
                        member.removeRole(msg.guild.roles.find(r => r.name === "Senate"));
                    }
                }
                peach.setDescription(`${msg.member.displayName}, I have ` +
                                     `impeached ${member.displayName} from ${role.name}.`);
                peach.setFooter(`Impeached ${member.displayName} from ${role.name}.`);
                bot.logEmbed.setTitle("Impeach")
                    .addField("User", member.user.tag)
                    .addField("Perpetrator", msg.member.user.tag)
                    .addField("Position", role.name);
                bot.logs.send(bot.logEmbed);
                m.delete();
            });
    }
};
