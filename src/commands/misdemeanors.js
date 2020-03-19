module.exports = {
    name: 'misdemeanors',
    desc: 'Find the amount of misdemeanors on you or another member.',
    usage: ';misdemeanor [member]',
    aliases: ['mrmeanors', 'mrmeanor', 'misdemeanor'],
    examples: ';misdemeanors // Get your current misdemeanors\n\n;misdemeanors @sperg#6969 // Get sperg\'s current misdemeanors',
    async execute(msg, bot, args) {
        let mrmeanor;
        const Discord = require('discord.js');
        if (msg.mentions.members.first()) {
            mrmeanor = await bot.Misdemeanors.findOne({
                where: {
                    user: msg.mentions.members.first().user.id,
                    guild: msg.guild.id
                }
            });
        } else {
            mrmeanor = await bot.Misdemeanors.findOne({
                where: {
                    user: msg.author.id,
                    guild: msg.guild.id
                }
            });
        }
        if (!mrmeanor) return msg.channel.send("I either couldn't find any misdemeanors for that user, or another error has occured.");
        const mEmbed = new Discord.RichEmbed()
        .setDescription(`${msg.author.tag}, ${msg.author.id===mrmeanor.name ? `you have ` : `${msg.mentions.members.first().displayName} has `} **${mrmeanor.misdemeanors}** misdemeanors.`)
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL, msg.author.displayAvatarURL).setTimestamp();
        msg.channel.send(mEmbed);
    }
};