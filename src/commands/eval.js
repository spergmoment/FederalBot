module.exports = {
    name: "eval",
    noDocs: true,
    execute(msg, bot, args) {
        const util = require("util");
        const Discord = require("discord.js");
        if (msg.member.roles.find(r => r.name === "Bot Owner")) {
            msg.channel.send("Evaluating...")
                .then(async m => {
                    try {
                        let result = eval(args.join(" "));
                        while (result instanceof Promise) {
                            result = await result;
                        }
                        if (typeof result !== 'string') {
                            result = util.inspect(result, {
                                depth: 0
                            });
                        }
                        result = result.replace(msg.client.token, 'null');
                        const evalEmbed = new Discord.RichEmbed()
                            .setColor("RANDOM")
                            .addField("Eval", "```js\n" + args.join(" ") + "```")
                            .addField("Returns", "```js\n" + result + "```");
                        msg.channel.send(evalEmbed);
                        m.delete();
                    } catch (err) {
                        const evalEmbed = new Discord.RichEmbed()
                            .setColor("RED")
                            .addField("Eval", "```js\n" + args.join(" ") + "```")
                            .addField("Error", "```js\n" + err + "```");
                        msg.channel.send(evalEmbed);
                        m.delete();
                    }
                });
        }
    }
};
