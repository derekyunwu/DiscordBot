const Discord = require('discord.js')
const pagination = require('discord.js-pagination')
const fetch = require('node-fetch');

const eggImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/175.png"
const imageURL = "https://pokeapi.co/api/v2/pokemon/" 

const eggType = {
    'bronze': 'green',
    'silver': 'green',
    'gold': 'gold',
    'diamond': 'purple'
}

module.exports = async (client, message, pokemon, tier) => {

    const edited = pokemon.toLowerCase()

    const { species , sprites } = await fetch(imageURL + edited)
        .then(res => res.json())
        .catch(err => {
            msg.channel.send("An error has occurred while retrieving Pokemon data.")
        });

    const hiddenEmbed = new Discord.MessageEmbed()
        .setTitle('Roll Results:')
        .setDescription(`Congratulations! ${message.author} has rolled a(n) _______.`)
        .setImage(eggImage)
        .setTimestamp()

    const revealEmbed = new Discord.MessageEmbed()
        .setTitle('Roll Results:')
        .setDescription(`Congratulations! ${message.author} has rolled a(n) ${pokemon}.`)
        .setImage(sprites.other["official-artwork"].front_default)
        .setTimestamp()
    
    const pages = [
        hiddenEmbed,
        revealEmbed
    ]
    
    const emojiList = [ "◀️", "🎰" ]

    const timeout = 120000

    pagination(message, pages, emojiList, timeout)  
}