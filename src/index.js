require('dotenv').config();

const {Client, Message, MessageEmbed, MessageAttachment} = require('discord.js');
const fetch = require('node-fetch');
const mongo = require('./mongo');
const userInvenSchema = require('../schemas/inventory-schema')
const rem = require('./rem')
const rollPage = require('./pages')

const bot = new Client();
const PREFIX = "!";
const url = "https://pokeapi.co/api/v2/pokemon/";
var curr_pokemon = '';
const roleName = 'Pokemon Trainer';

bot.login(process.env.DISCORDJS_BOT_TOKEN);

bot.on('ready', () => {
    console.log('PokeBot is online.');
});

bot.on('message', async msg => {
    if (msg.author.bot) return;
    if (msg.content.startsWith(PREFIX)){

        // user is attempting to use bot functionality
        const [CMD_NAME, ...args] = msg.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/); // regex expression to ignore whitespace as arguments
        
        const { guild, author } = msg
        const { id } = author
        const member = guild.members.cache.find(member => member.id === id)

        if (CMD_NAME === 'intro'){

            // display intro bot documentation
            msg.channel.send(`Hi ${author}! I'm DerkBot.\n` + 
            'I am a PokeCord mini-clone. Through me, users in this server can catch + collect Pokemon. ' +
            'Currently, I only support the following functionality: \n\n' +
            '1) Spawning + Catching Pokemon\n' + 
            '2) Rolling for Pokemon through an REM using dupe credits\n\n' +
            'For more information, type <!help>.'
            )

        } else if (CMD_NAME === "help"){

            msg.channel.send("I support the following commands:\n\n" +
            "**!help** - Displays my active commands\n" + 
            "**!intro** - Displays a welcome description for new users\n" + 
            "**!start** - Claims **Pokemon Trainer** role / Can begin catching Pokemon\n" + 
            "**!generate** - Randomly returns an image of a Gen 1 Pokemon\n" + 
            "**!catch <pokemon-name>** - Adds pokemon to personal inventory if <pokemon-name> is correct / Can only be used if a wild Pokemon has appeared\n" + 
            "**!inventory** - Prints a list of Pokemon in user inventory\n" + 
            "**!roll** - Uses dupe credits and rolls for a random Pokemon\n" +
            "**!credits** - Displays the number of credits + rolls usable for the REM\n" +
            "**!end** - Forfeit **Pokemon Trainer** role / All data is purged\n" 
            );

        } else if (CMD_NAME === "start"){
            //begins pokemon adventure

            if (member.roles.cache.some(role => role.name === roleName)){
                msg.channel.send(`Woops. It looks like ${author} has already begun their adventure!`);
                return
            }

            await mongo().then(async mongoose => {
                try {
                    await new userInvenSchema({
                        _id: id
                    }).save()
                } finally {
                    mongoose.connection.close()
                }
            })

            const role = guild.roles.cache.find(role => role.name === roleName);
            member.roles.add(role);
            msg.channel.send(`Congratulations ${author}! You have begun your Pokemon adventure. You have claimed the ${roleName} role.`)

        } else if (CMD_NAME === "generate"){

            const pokemon_id = Math.floor( (Math.random() * 151) + 1);
            const final_url = url + pokemon_id;
            // const final_url = url + 1;

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
            curr_pokemon = species.name.charAt(0).toUpperCase() + species.name.slice(1); // may not be the best way to do this

        } else if (CMD_NAME === "catch"){

            if (!member.roles.cache.some(role => role.name === roleName)){
                msg.channel.send(`${author}, it looks like you haven't started your Pokemon adventure. Type **!start** to begin catching Pokemon.`);
            } else if (!curr_pokemon){
                msg.channel.send("Cannot <!catch> at this time. No wild Pokemon have appeared!");
            } else {
                if (args[0].toLowerCase() === curr_pokemon.toLowerCase()){
                    
                    var temp = curr_pokemon;
                    curr_pokemon = "";

                    await mongo().then(async mongoose => {
                        try {
                            var inven = await userInvenSchema.distinct("invenPoke", { _id: id })

                            if (inven.includes(temp)){
                                await userInvenSchema.findOneAndUpdate({
                                    _id: id
                                }, {
                                    $inc: {
                                        myCredits: 1
                                    }
                                })
                            } else {
                                await userInvenSchema.findOneAndUpdate({
                                    _id: id
                                }, {
                                    $inc: {
                                        count: 1
                                    },
                                    $addToSet: {
                                        invenPoke: temp,
                                    },
                                })
                            }
                        } finally {
                            mongoose.connection.close()
                        }
                    })

                    msg.channel.send(`Congratulations ${author}! You have caught a wild ${temp}! ${temp} has been added to your inventory.`);
                    // finished
                }
            }
        } else if (CMD_NAME === "inventory"){

            if (!member.roles.cache.some(role => role.name === roleName)){
                msg.channel.send(`${author}, it looks like you haven't started your Pokemon adventure. Type **!start** to begin catching Pokemon.`);
            } else {
                await mongo().then(async mongoose => {
                    try {

                        var inven = await userInvenSchema.distinct("invenPoke", { _id: id })
                        
                        if (inven.length == 0){
                            msg.channel.send(`${author}'s inventory has no Pokemon.`)
                            return
                        } else {
                            var poke_list = "";
                            for (var i = 0; i < inven.length; i ++){
                                poke_list += inven[i] + "\n";
                            }

                            const inventory_embed = new MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle(`Inventory:`)
                                .setDescription(poke_list)
                                .setFooter(`Requested by ${msg.author.tag}.`, msg.author.displayAvatarURL);
                            
                            msg.channel.send(inventory_embed)
                        }
                    } finally {
                        mongoose.connection.close()
                    }
                })
                
            }
        } else if (CMD_NAME === "roll") {

            if (!member.roles.cache.some(role => role.name === roleName)){
                msg.channel.send(`${author}, it looks like you haven't started your Pokemon adventure. Type **!start** to begin catching Pokemon.`);
                return
            }
            // check if user has enough credits

            await mongo().then(async mongoose => {
                try {
                    var result = await userInvenSchema.findOne({
                        _id: id
                    })

                    if (result.myCredits < 2) {
                        msg.reply(`It looks like you don't have enough credits to roll at this moment!`)
                        return
                    }

                    const roll_result = rem()
                    const type = roll_result[1]
                    const pokemonName = roll_result[0]
                    // const type = 'green'
                    // const pokemonName = 'Bulbasaur'

                    if (!pokemonName){
                        msg.reply(`It looks like something went wrong! Try again.`)
                        return
                    }

                    var inven = await userInvenSchema.distinct("invenPoke", { _id: id })

                    if (inven.includes(pokemonName)){
                        await userInvenSchema.findOneAndUpdate({
                            _id: id
                        }, {
                            $inc: {
                                myCredits: -1
                            }
                        })
                        msg.reply('It appears you have rolled a dupe! 1 credit has been refunded.')
                    } else {
                        await userInvenSchema.findOneAndUpdate({
                            _id: id
                        }, {
                            $inc: {
                                myCredits: -2
                            },
                            $addToSet: {
                                invenPoke: pokemonName,
                            },
                        }, {
                            upsert: true,
                        })
    
                        rollPage(bot, msg, pokemonName, type)
                    }

                } finally {
                    mongoose.connection.close()
                }
            })

            // adds to inventory

        } else if (CMD_NAME === "credits") {

            if (!member.roles.cache.some(role => role.name === roleName)){
                msg.channel.send(`${author}, it looks like you haven't started your Pokemon adventure. Type **!start** to begin catching Pokemon.`);
            } else {

                await mongo().then(async mongoose => {
                    try {
                        var result = await userInvenSchema.findOne({
                            _id: id
                        })
                        
                        msg.channel.send(`${author} has ${result.myCredits} credit(s) or ${Math.trunc(result.myCredits/2)} roll(s).`)

                    } finally {
                        mongoose.connection.close()
                    }
                })

            }

        } else if (CMD_NAME === "end"){
            // if does not have pokemon trainer role
            if (!member.roles.cache.some(role => role.name === roleName)){
                msg.channel.send(`${author}, it looks like you haven't started your Pokemon adventure. Type **!start** to begin catching Pokemon.`);
            } else {

                await mongo().then(async mongoose => {
                    try {
                        await userInvenSchema.findOneAndDelete({
                            _id: id
                        })
                        // remove the role from the user

                        const role = guild.roles.cache.find(role => role.name === roleName);
                        member.roles.remove(role);

                    } finally {
                        mongoose.connection.close()
                    }
                })
                
                msg.channel.send(`${author} your data has been deleted and cannot be recovered.`)
            }
        } 
    }
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === "general");
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}!`);
});
