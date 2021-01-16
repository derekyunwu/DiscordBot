const Discord = require('discord.js')
const fetch = require('node-fetch')

const url = "https://pokeapi.co/api/v2/pokemon/"

module.exports = async (message, channelID) => {
    if (message.channel.id !== channelID) return ""

    const pokemon_id = Math.floor( (Math.random() * 151) + 1)
    const final_url = url + pokemon_id

    const { species , sprites } = await fetch(final_url)
        .then(res => res.json())
        .catch(err => {
            message.reply("An error has occurred while retrieving Pokemon data.")
        });
    
    const artwork = sprites.other["official-artwork"].front_default;

    const pokemon_embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('A wild Pokemon has appeared!')
        .setDescription('To catch this Pokemon, type !catch <pokemon-name>. The first person who guesses the correct Pokemon name catches the Pokemon successfully.')
        .setImage(artwork)
        .setTimestamp();
    
    message.channel.send(pokemon_embed);
    return species.name.charAt(0).toUpperCase() + species.name.slice(1);
}