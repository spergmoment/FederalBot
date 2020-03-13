/* jshint esversion: 8 */
module.exports = {
    name: 'help',
    execute(msg, bot, args) {
        const Discord = require("discord.js");
        const help = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor("RANDOM");
        const {
            commands
        } = msg.client;
        if (args.length === 0 || args[0] === "1") {
            help.addField(";nominate", "For CP, CJ, or Speaker to nominate Officers, Judges, " + "and members of Congress respectively.")
                .addField(";impeach", "For CP, CJ, or Speaker to impeach Officers, Judges, " + "and members of Congress respectively.")
                .addField(";elect", "For Pres or Bot Owners to create elections for any main governmental position.")
                .addField(";poll", "For bot owners to create polls.")
                .addField(";resign", "For anyone in a governmental position to resign from their positions.")
                .addField(";detain", "For Officers to detain someone for breaking a law. " + "A Judge must use `;approve` the detained user to put them in court.")
                .addField(";approve", "For Judges to approve any detainments put on by Officers, which sends them to court.")
                .addField(";reset", "For bot owners to stop the process of FederalBot.")
                .addField(";guilty", "For the judge of a case to rule the defendant as `guilty`.")
                .addField(";innocent", "For the judge of a case to rule the defendant as `not guilty`.")
                .addField(";mistrial", "For the judge of a case to rule the case as a `mistrial`.")
                .setFooter('Page 1 of 2');
            msg.channel.send(help);
        } else if (args[0] === '2') {
            help.addField(";law", "Displays any of the 9 current laws.")
                .addField(";right", "Displays any of the 10 current rights.")
                .addField(";update", "For bot owners/admins to display updates to the bot.")
                .addField(";module", "Displays the various modules of FederalBot.")
                .addField(";bill", "Creates a bill in Congress.")
                .addField(";eval", "For Bot Owners to evaluate, or execute, code.")
                .addField(";clear", "For Congress members to clear up to 100 messages in a channel.")
                .addField(";ping", "Get various pings from the API or Client to the message, API/Client, or your client.")
                .addField(";warrant", "Grant a warrant for arrest.")
                .addField(";arrest", "Arrest on a granted warrant.")
                .addField(";misdemeanors", "Get the amount of misdemeanors on you or another member.")
                .setFooter('Page 2 of 2');
            msg.channel.send(help);
        } else {
            const command = commands.get(args[0]) || commands.find(c => c.aliases && c.aliases.includes(args[0]));
            if (!command) return msg.channel.send("That is not a valid command.");
            if (command.name) help.setTitle(`;${command.name}`);
            if (command.desc) help.setDescription(command.desc);
            if (command.usage) help.addField("Usage", command.usage);
            if (command.examples) {
                if (command.examples.includes("\n\n")) {
                    help.addField("Examples", command.examples);
                } else {
                    help.addField("Example", command.examples);
                }
            }
            if (command.extraNotes) help.addField("Extra notes", command.extraNotes);
            msg.channel.send(help);
        }
    }
};