exports.run = (msg, bot, args) => {
    const Discord = require("discord.js");
    const help = new Discord.RichEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL, msg.author.avatarURL)
        .setTimestamp()
        .setColor("RANDOM");
    if (args.length === 0 || args[0] === "1") {
        help.addField(";nominate", "For CP, CJ, or Speaker to nominate Officers, Judges, " +
                      "and members of Congress respectively.")
        .addField(";impeach", "For CP, CJ, or Speaker to impeach Officers, Judges, " +
                  "and members of Congress respectively.")
        .addField(";elect", "For Pres or Bot Owners to create elections for any main governmental position.")
        .addField(";poll", "For bot owners to create polls.")
        .addField(";resign", "For anyone in a governmental position to resign from their positions.")
        .addField(";detain", "For Officers to detain someone for breaking a law. " +
                  "A Judge must use `;approve` the detained user to put them in court.")
        .addField(";approve", "For Judges to approve any detainments put on by officers, which sends them to court.")
        .addField(";reset", "For bot owners to stop the process of FederalBot.")
        .addField(";guilty", "For the judge of a case to rule the defendant as `guilty`.")
        .addField(";innocent", "For the judge of a case to rule the defendant as `not guilty`.")
        .setFooter('Page 1 of 2');
    } else if (args[0] === '2') {
        help.addField(";mistrial", "For the judge of a case to rule the case as a `mistrial`.")
        .addField(";law", "Displays any of the 9 current laws.")
        .addField(";right", "Displays any of the 10 current rights.")
        .addField(";update", "For bot owners/admins to display updates to the bot.")
        .addField(";module", "Displays the various modules of FederalBot.")
        .addField(";bill", "Creates a bill in Congress.")
        .addField(";eval", "For owners to evaluate, or execute, code.")
        .addField(";clear", "For Congress members to clear up to 100 messages in a channel.")
        .addField(";ping", "Get various pings from the API or Client to the message, API/Client, or your client.")
        .addField(";warrant", "Grant a warrant for arrest.")
        .addField(";arrest", "Arrest on a granted warrant.")
        .setFooter('Page 2 of 2');
    } else {
        if (args[0] === "nominate") {
            help.setTitle(";nominate")
            .setDescription("For CP, CJ, or Speaker to nominate a member for Officer, Judge, and Congress respectively.")
            .addField("Usage", ";nominate (member)")
            .addField("Example", ";nominate @sperg#6969 // Nominates member \"sperg#6969\" " +
                      "for Judge, Officer, or Congress.")
            .addField("Extra notes", "If you nominate someone for Congress, you must choose House or Senate. " +
                      "Have about 9 House members per Senator.")
            .setFooter(';nominate command');
        } else if (args[0] === "impeach") {
            help.setTitle(";impeach")
            .setDescription("For CP, CJ, or Speaker to impeach a member from Officer, Judge, or Congress respectively.")
            .addField("Usage", ";impeach (member)")
            .addField("Example", ";impeach @sperg#6969 // Impaches member \"sperg#6969\" " +
                      "from Judge, Officer, or Congress.")
            .addField("Extra notes", "Unlike ;nominate, Congress members are " +
                      "automatically impeached from their respective house.")
            .setFooter(';impeach command');
        } else if (args[0] === "elect") {
            help.setTitle(";elect")
            .setDescription("For Pres or Bot Owners to create elections for CJ, CP, Speaker, Pres, or VP.")
            .addField("Usage", ";elect (Number of candidates) (Position to elect for) (Candidates...)")
            .addField("Example", ";elect 2 President @bruh#2366 @sperg#6969 // Creates an election with 2 slots, " +
                      "the position being President, and the candidates being bruh and sperg")
            .setFooter(';elect command');
        } else if (args[0] === "poll") {
            help.setTitle(";poll")
            .setDescription("For bot owners/admins to create polls with an upvote and downvote option.")
            .addField("Usage", ";poll (poll message) (upvote option) (downvote option)")
            .addField("Example", ";poll \"Should we separate the Speaker of the House " +
                      "into one for House and one for Senate?\" " +
                      '"Separate it!" "Don\'t separate the role" // Creates a poll with the content shown.')
            .setFooter(";poll command");
        } else if (args[0] === "resign") {
            help.setTitle(";resign")
            .setDescription("For anyone in the government to resign from their position.")
            .addField("Usage", ";resign")
            .setFooter(';resign command');
        } else if (args[0] === "detain") {
            help.setTitle(";detain")
            .setDescription("For officers to detain someone who has broken the law. " +
                            "A judge must `;approve` the detainment within 5 minutes," +
                            " where they will be promptly sent to court. If no judge approves it, " +
                            "the Officer is impeached!")
            .addField("Usage", ";detain (member) (reason)")
            .addField("Example", ";detain @nigward#6969 3 // Detains member \"nigward#6969\", " +
                      "which can be approved by a judge.")
            .setFooter(';detain command');
        } else if (args[0] === "approve") {
            help.setTitle(";approve")
            .setDescription("For a judge to approve a detained user. If they aren't detained, the command will fail.")
            .addField("Usage", ";approve (member)")
            .addField("Example", ";approve @nigward#6969 // Approves the detainment set on member \"nigward#6969\", " +
                      "which creates a channel in court and sends a message there.")
            .setFooter(';approve command');
        } else if (args[0] === "reset") {
            help.setTitle(";reset")
            .setDescription("For Bot Owners to reset the FederalBot process.")
            .addField("Usage", ";reset")
            .addField("Extra notes", "Due to node.js complications, the Client() object is killed, " +
                      "and the process as well, " +
                      "thus it's impossible to fully \"reset\" the bot. " +
                      "Don't use this without my permission or notifying me beforehand, " +
                      "because I will usually just ctrl+C that shit outta here")
            .setFooter(";reset command");
        } else if (args[0] === "guilty") {
            help.setTitle(";guilty")
            .setDescription("For the judge of a case to rule the defendant `guilty`.")
            .addField("Usage", ";guilty (reason) (prison sentence)")
            .addField("Example", ";guilty \"Proven to be Sperg's alt. " +
                      "Sperg already has another alt in the server, bug." +
                      "Law 3 states that you may only have one alt in the server at ANY time, thus breaking Law 3. " +
                      "Sperg and his other alt will be put on trial accordingly.\" 24h // Rules the case `guilty`, " +
                      "sentences \"nigward#6969\" to a 1 day prison sentence, and closes the case.")
            .addField("Extra notes", "If a prison sentence is put on a 1st, 2nd, or 3rd misdemeanor, " +
                      "you will be immediately impeached and the user will be freed.")
            .setFooter(';guilty command');
        } else if (args[0] === "innocent") {
            help.setTitle(";innocent")
            .setDescription("For the judge of a case to rule the defendant `not guilty`, or otherwise `innocent`.")
            .addField("Usage", ";innocent (reason)")
            .addField("Example", ";innocent \"The defendant, nigward, just happens to be a friend of Sperg's. " +
                      "Interrogations from other members have shown that nigward is a classic member of the server, " +
                      "and has been consistently active for a while.\" // \"nigward#6969\" " +
                      "is ruled `innocent`, and the case is closed.")
            .setFooter(';innocent command');
        } else if (args[0] === "mistrial") {
            help.setTitle(";mistrial")
            .setDescription("For the judge of a case to rule the case as a `mistrial`.")
            .addField("Usage", ";mistrial")
            .addField("Extra Notes", "A mistrial is for an accidental, or otherwise unlawful, " +
                      "incorrect, or overall wrong detainment.")
            .setFooter(';mistrial command');
        } else if (args[0] === "law") {
            help.setTitle(";law")
            .setDescription("Shows any of the 9 currently passed laws.")
            .addField("Usage", ";law (law)")
            .addField("Example", ";law 2 // returns law 2, raiding.")
            .setFooter(';law command');
        } else if (args[0] === "right") {
            help.setTitle(";right")
            .setDescription("Displays any of the 10 currently passed rights.")
            .addField("Usage", ";right (right)")
            .addField("Example", ";right 1 // returns right 1, the freedom of speech.")
            .setFooter(';right command');
        } else if (args[0] === "update") {
            help.setTitle(";update")
            .setDescription("For bot owners or admins to display bot updates.")
            .addField("Usage", ";update (update syntax)")
            .addField("Examples", ";update Added a new command, ;update, for bot owners/admins to display updates. " +
                      "// the bot will send the update. \n\n;update 1 // There are 3 predefined updates: " +
                      "Bug fixes, code cleanup, and Permissions object updates.")
            .setFooter(';update command');
        } else if (args[0] === "module") {
            help.setTitle(";module")
            .setDescription("Displays the modules, or one specific module.")
            .addField("Usage", ";module (module to display)")
            .addField("Examples", ";module // Shows all modules available. \n\n;module branches " +
                      "// Shows you the commands in the category \"branches\".")
            .setFooter(';module command');
        } else if (args[0] === "bill") {
            help.setTitle(";bill")
            .setDescription("For Congress to make bills.")
            .addField("Usage", ";bill (bill)")
            .addField("Example", ";bill Impeach John from Congress! // Returns a bill with content " +
                      "\"Impeach John from Congress!\" and reacts with a yes and no emote.")
            .setFooter(';bill command');
        } else if (args[0] === "eval") {
            help.setTitle(";eval")
            .setDescription("For Owners to evaluate JS code. Can also be used as a calculator.")
            .addField("Usage", ";eval (code)")
            .addField("Example", ";eval function run() {\n   " + 
                      "return Math.PI\*4;\n}\nrun();" +
                      " // Outputs a response containing the input, and returns 12.68.")
            .addField("Extra notes", "If the code detects an error, it returns that error.")
            .setFooter(";eval command");
        } else if (args[0] === "clear") {
            help.setTitle(";clear")
            .setDescription("Clears out messages in a channel.")
            .addField("Usage", ";clear (amount)")
            .addField("Examples", ";clear 50 // Clears 50 messages. \n\n;clear // Defaults to 20.")
            .addField("Extra Notes", "Do not abuse this command. API requests can cap, " +
                      "and if you cap too many times, I might get the bot disabled.")
            .setFooter(';module command');
        } else if (args[0] === "ping") {
            help.setTitle(";ping")
            .setDescription("Shows the API/Client ping to the message, API/Client, or your client.")
            .addField("Usage", ";ping, (API, Client), (Message, API/Client, Discord)")
            .setFooter(";ping command");
        } else if(args[0]==="warrant") {
            help.setTitle(";warrant")
            .setDescription("Grant a warrant to be `;arrest`ed by an officer.")
            .addField("Usage", ";warrant (member) (law) (evidence)")
            .addField("Example", ";warrant @sperg#6969 3 (link to image of him using the wrong alt) " +
                      "(link to another image) // grants a warrant against sperg, for law 3, " +
                      "and the evidence is images of him accidentally using the wrong alt.")
            .setFooter(";warrant command");
        }  if(args[0]==="arrest") {
            help.setTitle(";arrest")
            .setDescription("Arrests a warrant that was granted by a judge with `;warrant`.")
            .addField("Usage", ";arrest (member)")
            .addField("Example", ";arrest @sperg#6969 // arrests sperg, creating a court case.")
            .setFooter(";arrest command");
        } else {
            help.setDescription("This is not a command! Please use a command shown on the list.")
            .setFooter('Error in syntax: "' + args[0] + '" is not a valid command.');
        }
    }
    msg.channel.send(help);
};
