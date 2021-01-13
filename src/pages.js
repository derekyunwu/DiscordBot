const Discord = require('discord.js')
const pagination = require('discord.js-pagination')
const fetch = require('node-fetch');

const eggImage = "https://i.imgur.com/"
const imageURL = "https://pokeapi.co/api/v2/pokemon/" 

const eggType = {
    'bronze': '2ACXdI0',
    'silver': '2ACXdI0',
    'gold': '0w2FUyJ',
    'diamond': 'g2g3kvS'
}

module.exports = async (client, message, pokemon, tier) => {
    
    const edited = pokemon.toLowerCase()
    const hidden = eggImage + eggType[tier] + ".png"

    const { species , sprites } = await fetch(imageURL + edited)
        .then(res => res.json())
        .catch(err => {
            msg.channel.send("An error has occurred while retrieving Pokemon data.")
        });

    const hiddenEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Roll Results:')
        .setDescription(`Congratulations! ${message.author} has rolled a(n) _______.`)
        .setImage(hidden)
        .setTimestamp()

    const revealEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
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