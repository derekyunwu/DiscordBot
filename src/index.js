require('dotenv').config();

const {Client, Message, MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
const bot = new Client();
const PREFIX = "!";
const url = "https://pokeapi.co/api/v2/pokemon/";
const artwork = ""

bot.login(process.env.DISCORDJS_BOT_TOKEN);

bot.on('ready', () => {
    console.log('Derkbot is online.');
});

bot.on('message', async msg => {
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
        } else if (CMD_NAME === "generate"){
            // testing the http requests
            const pokemon_id = Math.floor( (Math.random() * 151) + 1);
            const final_url = url + pokemon_id;

            const { species , sprites } = await fetch(final_url)
                .then(res => res.json())
                .catch(err => {
                    msg.channel.send("An error has occurred while retrieving Pokemon data.")
                });
            const artwork = sprites.other["official-artwork"].front_default;

            // testing the embed
            const pokemon_embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('A wild Pokemon has appeared!')
                .setDescription('To catch this Pokemon, type !catch <pokemon-name>. The first person who guesses the correct Pokemon name catches the Pokemon successfully.')
                .setImage(artwork)
                .setTimestamp();
            msg.channel.send(pokemon_embed);
        } else if (CMD_NAME === "help"){
            msg.channel.send(`
            I support the following commands:\n\n**!help** - Displays my active commands\n**!intro** - Displays intro message for my activities\n**!generate** - Randomly returns an image of a Gen 1 Pokemon
            `)
        }
    }
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === "general");
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}!`);
});
