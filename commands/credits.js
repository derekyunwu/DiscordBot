const Discord = require('discord.js')
const mongo = require('../src/mongo')
const userInvenSchema = require('../schemas/inventory-schema')

module.exports = async (message, channelID) => {
    if (message.channel.id !== channelID) return

    await mongo().then(async mongoose => {
        try {
            var result = await userInvenSchema.findOne({
                _id: message.author.id
            })
            if (result) {
                message.reply(`you have ${result.myCredits} credit(s) or ${Math.trunc(result.myCredits/2)} roll(s).`)
            } else {
                message.reply(`it appears you have not started your Pokemon adventure.`)
            }
        } finally {
            mongoose.connection.close()
        }
    })
}