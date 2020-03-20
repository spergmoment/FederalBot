module.exports = {
    name: 'ticket',
    noDocs: true,
    async execute(msg, bot, args) {
        if(msg.channel.type!=="dm") return;
        if(args.length===0) return msg.channel.send("Please enter some content for the ticket!");
        const HH = await bot.fetchUser("670803998432952320");
        const bug = await bot.fetchUser("628041675851300864");
        const tCont = args.join(" ");
        msg.channel.send("Thank you! A bot owner will be back with you soon. Please note that abuse of the ticket system will result in temporary ticket blacklisting.");
        HH.send(`${msg.author.tag} sent a ticket: ${tCont}`);
        bug.send(`${msg.author.tag} sent a ticket: ${tCont}`);
    }
}