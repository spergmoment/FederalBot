exports.run = (msg,bot,args) => {
    const Discord = require("discord.js");
    const help = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
            .setTimestamp()
            .setColor('#' + (0x1000000 + (Math.random()) * 0xffffff)
                .toString(16)
                .substr(1, 6));
        if (args.length === 0 || args[0] === "1") {
            help.addField(";nominate", "For CP, CJ, or Speaker to nominate police officers, Judges, and members of Congress respectively.");
            help.addField(";impeach", "For CP, CJ, or Speaker to impeach police officers, Judges, and members of Congress respectively.");
            help.addField(";elect", "For Pres or Bot Owners to create elections for Pres, VP, Speaker, CJ, or CP.");
            help.addField(";poll", "For bot owners to create polls.");
            help.addField(";resign", "For anyone in a governmental position (Besides VP/Pres) to resign from their positions.");
            help.addField(";detain", "For officers to detain someone for breaking a law. A judge must use `;approve` on the detained user to put them in court.");
            help.addField(";approve", "For judges to approve any detainments put on by officers, which sends them to court.");
            help.addField(";reset", "For bot owners to restart the process of FederalBot.");
            help.addField(";guilty", "For the judge of a case to rule the defendant as `guilty`.");
            help.setFooter('Page 1 of 2');
        } else if (args[0] === '2') {
            help.addField(";innocent", "For the judge of a case to rule the defendant as `not guilty`.");
            help.addField(";mistrial", "For the judge of a case to rule the case as a `mistrial`.");
            help.addField(";law", "Displays any of the 9 current laws.");
            help.addField(";right", "Displays any of the 10 current rights.");
            help.addField(";update", "For bot owners/admins to display updates to the bot.");
            help.addField(";module", "Displays the various modules of FederalBot Reborn.");
            help.addField(";bill", "Creates a bill in Congress.");
            help.addField(";eval", "For owners to evaluate code.");
            help.addField(";clear", "Members of Congress can clear messages in a channel.");
            help.addField(";ping", "Gets the ping from the API and Client.");
            help.setFooter('Page 2 of 2');
        } else {
            if (args[0] === "nominate") {
                help.setTitle(";nominate");
                help.setDescription("For CP, CJ, or Speaker to nominate a member for Officer, Judge, and Congress respectively.");
                help.addField("Usage", ";nominate (member)");
                help.addField("Example:", ";nominate @sperg#6969 // Nominates member 'sperg#6969' for Judge, Officer, or Congress.");
                help.addField("Extra notes", "If you nominate someone for Congress, you must choose House or Senate.");
                help.setFooter(';nominate command');
            } else if (args[0] === "impeach") {
                help.setTitle(";impeach");
                help.setDescription("For CP, CJ, or Speaker to impeach a member from Officer, Judge, or Congress respectively.");
                help.addField("Usage", ";impeach (member)");
                help.addField("Example:", ";impeach @sperg#6969 // Impaches member 'sperg#6969' from Judge, Officer, or Congress.");
                help.addField("Extra notes", "Unlike ;nominate, Congress members are automatically impeached from their respective house.");
                help.setFooter(';impeach command');
            } else if (args[0] === "elect") {
                help.setTitle(";elect");
                help.setDescription("For Pres or Bot Owners to create elections for CJ, CP, Speaker, Pres, or VP.");
                help.addField("Usage", ";elect (Number of candidates) (Position to elect for) (Candidates...)");
                help.addField("Example:", ";elect 2 President @bruh#2366 @sperg#6969 // Creates an election with the position being President, and the candidates being bruh and sperg");
                help.setFooter(';elect command');
            } else if (args[0] === "poll") {
                help.setTitle(";poll");
                help.setDescription("For bot owners/admins to create polls with an upvote and downvote option.");
                help.addField("Usage", ";poll (poll message) (upvote option) (downvote option)");
                help.addField("Example", ';poll "Should we separate the Speaker of the House into one for House and one for Senate?" "Separate it!" "Don\'t separate the role" // Creates a poll with the content shown.');
                help.setFooter(";poll command");
            } else if (args[0] === "resign") {
                help.setTitle(";resign");
                help.setDescription("For anyone in the government to resign from their position.");
                help.addField("Usage", ";resign");
                help.setFooter(';resign command');
            } else if (args[0] === "detain") {
                help.setTitle(";detain");
                help.setDescription("For officers to detain someone who has broken the law. A judge must `;approve` the detainment for the user to be sent to court.");
                help.addField("Usage", ";detain (member) (reason)");
                help.addField("Example:", ";detain @nigward#6969 'Law 3' // Detains member 'nigward#6969', which can be approved by a judge.");
                help.setFooter(';detain command');
            } else if (args[0] === "approve") {
                help.setTitle(";approve");
                help.setDescription("For a judge to approve a detained user. If they aren't detained, the command will fail.");
                help.addField("Usage", ";approve (member)");
                help.addField("Example:", ";approve @nigward#6969 // Approves the detainment set on member 'nigward#6969', which creates a channel in court and sends a message there.");
                help.addField("Extra notes", "I took an entire week to get this working.");
                help.setFooter(';approve command');
            } else if (args[0] === "reset") {
                help.setTitle(";reset");
                help.setDescription("For Bot Owners to reset the FederalBot process.");
                help.addField("Usage", ";reset");
                help.addField("Extra notes", "Due to node.js complications, the Client() object is killed, and the process as well, thus it's impossible to fully \"reset\" the bot.");
                help.setFooter(";reset command");
            } else if (args[0] === "guilty") {
                help.setTitle(";guilty");
                help.setDescription("For the judge of a case to rule the defendant `guilty`. Note: if a prison sentence is put on a 1st or 2nd misdemeanor, you will be immediately impeached and the user will be freed.");
                help.addField("Usage", ";guilty (reason) (prison sentence)");
                help.addField("Example:", ";guilty \"Proven to be sperg's alt. Sperg already has another alt in the server, bug. Law 3 states that you may only have one alt in the server at ANY time, and can not use it to your advantage, thus breaking Law 3. Sperg and his other alt will be put on trial accordingly.\" 24h // Rules the case `guilty`, sentences 'nigward#6969' to a 1 day prison sentence, and closes the case.");
                help.setFooter(';guilty command');
            } else if (args[0] === "innocent") {
                help.setTitle(";innocent");
                help.setDescription("For the judge of a case to rule the defendant `not guilty`, or otherwise `innocent`.");
                help.addField("Usage", ";innocent (reason)");
                help.addField("Example:", ";innocent \"The defendant, nigward, just happens to be a friend of Sperg\'s. Interogations from other members have shown that nigward is a classic member of the server, and has been consistently active for a while.\" // 'nigward#6969' is ruled `innocent`, and the case is closed.");
                help.setFooter(';innocent command');
            } else if (args[0] === "mistrial") {
                help.setTitle(";mistrial");
                help.setDescription("For the judge of a case to rule the case as a `mistrial`. Note: A mistrial is for an accidental detainment or an otherwise incorrect detainment.");
                help.addField("Usage", ";mistrial");
                help.setFooter(';mistrial command');
            } else if (args[0] === "law") {
                help.setTitle(";law");
                help.setDescription("Shows any of the 9 currently passed laws.");
                help.addField("Usage", ";law (law)");
                help.addField("Example:", ";law 2 // returns law 2, raiding.");
                help.setFooter(';law command');
            } else if (args[0] === "right") {
                help.setTitle(";right");
                help.setDescription("Displays any of the 10 currently passed rights.");
                help.addField("Usage", ";right (right)");
                help.addField("Example:", ";right 1 // returns right 1, the freedom of speech.");
                help.setFooter(';right command');
            } else if (args[0] === "update") {
                help.setTitle(";update");
                help.setDescription("For bot owners or admins to display bot updates.");
                help.addField("Usage", ";update (update syntax)");
                help.addField("Examples:", ";update Added a new command, ;update, for bot owners/admins to display updates. // the bot will send the update. \n\n;update 1 // There are 3 predefined updates: Bug fixes, code cleanup, and Permissions object updates.");
                help.setFooter(';update command');
            } else if (args[0] === "module") {
                help.setTitle(";module");
                help.setDescription("Displays the modules, or one specific module.");
                help.addField("Usage", ";module (module to display)");
                help.addField("Examples:", ";modules // Shows all modules available. \n\n;module branches // Shows you the commands in the category |1:23106:'branches'.");
                help.setFooter(';module command');
            } else if (args[0] === "bill") {
                help.setTitle(";bill");
                help.setDescription("For Congress to make bills");
                help.addField("Usage", ";bill (bill)");
                help.addField("Examples:", ";bill Impeach John from Congress! // Returns a bill with content \"Impeach John from Congress!\" and reacts with a yes and no emote.");
                help.setFooter(';bill command');
            } else if(args[0]==="eval") {
              help.setTitle(";eval");
                help.setDescription("For Owners to evaluate JS code. Can also be used as a calculator.");
                help.addField("Usage", ";eval (code)");
                help.addField("Examples:", ";eval function run() {\n   return Math.PI*4;\n}\nrun(); // Outputs a response containing the input, and returns 12.68 (pi*4).");
                help.addField("Extra notes", "If the code detects an error, it returns that error.");
                help.setFooter(";eval command");
            } else if(args[0]==="clear") {
              help.setTitle(";clear");
                help.setDescription("Clears out messages in a channel.");
                help.addField("Usage", ";clear (amount)");
                help.addField("Examples:", ";clear 50 // Clears 50 messages. \n\n;clear // Defaults to 20.");
                help.addField("Extra Notes", "Do not abuse this command. API requests can cap, and if you cap too many times, I might get the bot disabled.");
                help.setFooter(';module command');
            } else if(args[0]==="ping") {
              help.setTitle(";ping");
                help.setDescription("Shows the bot's ping to the API and the Client() object.");
                help.addField("Usage", ";ping");
                help.setFooter(";ping command");
            }
            else {
                help.setDescription("This is not a command! Please use a command shown on the list.");
                help.setFooter('Error in syntax: "' + args[0] + '" is not a valid command.');
            }
        }
        msg.channel.send(help);
};
