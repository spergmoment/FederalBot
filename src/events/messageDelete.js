module.exports = (bot, m) => {
    function dateConvert() {
    var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
    var weeks = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
  ];
    var time = m.createdAt;
    var yr = time.getFullYear();
    var mon = time.getMonth();
    mon = months[mon];
    var day = time.getDate(); // gets the day, e.g 27
    var hr = time.getHours(); // gets the current hour, e.g 9, it is in 24 hour time and formatting it to 12 hour time has bad side effects, like making anything ≥ 10 be 0
    var min = time.getMinutes(); // gets the current minutes, e.g. 12
    var sec = time.getSeconds(); // gets current seconds, e.g. 34
    var week = time.getDay(); // gets day of week, e.g. monday
    week = weeks[week];
    if (hr < 10) {
        hr = "0" + hr.charAt(0);
    }
    if (min < 10) {
        min = "0" + min.charAt(0);
    }
    if (sec < 10) {
        sec = "0" + sec.charAt(0);
    }
    return week + ", " + mon + " " + day + ", " + yr + ", at " + hr + ":" + min + ":" + sec;
}
    if(!m.content) return;
    if(m.author.bot) return;
    const Discord = require("discord.js");
    const logsEmbed = new Discord.RichEmbed()
    .setDescription("")
    .setTitle("");
    const logs = m.guild.channels.find(r => r.name === ("logs"));
    if (logs) {
        logsEmbed
        .setTitle("Deleted Message")
            .addField("Author", m.author.username)
            .addField("Content", m.content)
            .addField("Channel", m.channel.name)
            .addField("Message Time", dateConvert())
            .addField("IDs", "```Message ID: " + m.id + "\nUser ID: " + m.author.id + "```");
        logs.send(logsEmbed);
    }
}
