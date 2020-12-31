require('dotenv').config();

const {Client, Message} = require('discord.js');
const bot = new Client();
const PREFIX = "!";

bot.login(process.env.DISCORDJS_BOT_TOKEN);

bot.on('ready', () => {
    console.log('Derkbot is online.');
});

bot.on('message', msg => {
    if (msg.author.bot) return;
    if (msg.content.startsWith(PREFIX)){
        // user is attempting to use bot functionality
        const [CMD_NAME, ...args] = msg.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/); // regex expression to ignore whitespace as arguments
        if (CMD_NAME === 'intro'){
            // display intro bot documentation
            msg.channel.send("Command read as !intro");
        } else if (CMD_NAME === "kick"){
            msg.channel.send("Command read as !kick");
        }
    }
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === "general");
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}!`);
});
