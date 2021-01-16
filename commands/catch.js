const Discord = require('discord.js')
const mongo = require('../src/mongo')
const userInvenSchema = require('../schemas/inventory-schema')

module.exports = async (message, channelID, curr_pokemon, args) => {
    if (message.channel.id !== channelID) return

    if (!curr_pokemon){
        message.reply('you cannot <!catch> Pokemon at this time!')
        return
    }

    await mongo().then(async mongoose => {
        try {
            var result = await userInvenSchema.findOne({
                _id: message.author.id
            })
            if (result){
                if (args[0].toLowerCase() === curr_pokemon.toLowerCase()){
                    if (result.invenPoke.includes(curr_pokemon)){
                        await userInvenSchema.findOneAndUpdate({
                            _id: message.author.id
                        }, {
                            $inc: {
                                myCredits: 1
                            }
                        })
                    } else {
                        await userInvenSchema.findOneAndUpdate({
                            _id: message.author.id
                        }, {
                            $inc: {
                                count: 1
                            },
                            $addToSet: {
                                invenPoke: curr_pokemon,
                            },
                        })
                    }
                    message.reply(`congratulations! You have caught a wild ${curr_pokemon}! ${curr_pokemon} has been added to your inventory.`)
                    curr_pokemon = ""
                }
            } else {
                message.reply('it appears you have not started your Pokemon adventure.')
            }
        } finally {
            mongoose.connection.close()
        }
    })
    return curr_pokemon
}