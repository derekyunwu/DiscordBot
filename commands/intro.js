const Discord = require('discord.js')

module.exports = (message) => {
    message.reply(
        `I'm PokeBot.\n` + 
        'I am a PokeCord mini-clone. Through me, users in this server can catch + collect Pokemon. ' +
        'Currently, I only support the following functionality: \n\n' +
        '1) Spawning + Catching Pokemon\n' + 
        '2) Rolling for Pokemon through an REM using dupe credits\n\n' +
        'For more information, type <!help>.'
    )
}