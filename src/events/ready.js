module.exports = (bot) => {
    bot.dateConvert = function(n) {
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
        var time = n;
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
    const Discord = require("discord.js");
    const wait = require('util')
        .promisify(setTimeout);
    bot.invites = [];
    wait(1000);
    bot.user.setActivity('with your feelings');
    bot.guilds.forEach(g => {
        g.fetchInvites()
            .then(guildInvites => {
                bot.invites[g.id] = guildInvites;
            });
    });
};
