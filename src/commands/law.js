exports.run = (msg, bot, args) => {
    const Discord = require("discord.js");
    var laws = [
  "**Law 1: Spam**\nSending an unreasonable amount of messages in a short amount of time. (Misdemeanor)",
  "**Law 2: Raid**\nSending a massive amount of messages in a very short time, or otherwise participating in a large attack on our server, is prohibited. (Felony/Banishment)",
  "**Law 3: Alt**\nUsing more than a single alternative account, or otherwise using an alt to your advantage, is prohibited. (Felony, Banishment of Alt(s))",
  "**Law 4: Misconduct**\nMisuse of government powers is hereby prohibited. (Misdemeanor, Felony, or Impeachment.)",
  "**Law 5: NSFW/L**\nSending NSFW outside of <#644334931434274816>, or NSFL anywhere is prohibited. (Felony)",
  "**Law 6: Slander**\nSeriously attempting to damage someone's reputation in a serious, harmful, or aggressive nature is prohibited. (Felony)",
  "**Law 7: Corruption**\nGovernment officials participating in dishonest actions, bribery, or otherwise seriously threatening others for their own good is very strictly prohibited. (Felony, Impeachment)",
  "**Law 8: Obstruction**\nDestroying evidence in any such way that it can be used for your own advantage is strictly prohibited. (Automatic loss of case, Impeachment (I/A))",
   "**Law 9: Invite**\nSending invites anywhere is prohibited. (Misdemeanor)"
];
    var lawThing = (laws[args[0] - 1]);
    const lawSend = new Discord.RichEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
        .setTimestamp()
        .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
            .toString(16)
            .substr(1, 6));
    lawSend.setDescription(lawThing);
    lawSend.setFooter('Law ' + args[0]);
    msg.channel.send(lawSend);
};
