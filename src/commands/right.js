exports.run = (msg, bot, args) => {
    const Discord = require("discord.js");
    var rights = [
  "**Right 1**\n The people have the right to freedom of speech.",
  "**Right 2**\n The executive branch shall not suppress any protest demanding the government for a redress of grievances.",
  "**Right 3**\n The accused has the right to cross-examine witnesses and dispute evidence in a fair, public and speedy process with a qualified and earnest attorney.",
  "**Right 4**\n For some of the lesser of crimes, the defendant must have been convicted for at least three misdemeanors of the same crime before a prison sentence may be ruled.",
  "**Right 5**\n The people have the right to remain silent.",
  "**Right 6**\n All communications during governmental proceedings must be readily available to the public.",
  "**Right 7**\n The accused shall not be prosecuted for the same crime more than once.",
  "**Right 8**\n The people may only be prosecuted for a crime within two weeks of the date it was committed.",
  "**Right 9**\n The people shall not be subject to vague or unreasonable legislation, including \"annoying\", pushing, or otherwise unlawful behavior against someone.",
  "**Right 10**\n Individual conduct in a court proceeding shall have no bearing on the verdict."
];
    var rightThing = (rights[args[0] - 1]);
    const rightSend = new Discord.RichEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
        .setTimestamp()
        .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
            .toString(16)
            .substr(1, 6));
    rightSend.setDescription(rightThing);
    rightSend.setFooter('Right ' + args[0]);
    msg.channel.send(rightSend);
};
