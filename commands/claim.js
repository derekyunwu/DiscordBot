const Discord = require('discord.js')
const mongo = require('../src/mongo')
const userInvenSchema = require('../schemas/inventory-schema')

module.exports = async (message, channelIDOne, channelIDTwo) => {
    if (message.channel.id !== channelIDOne && message.channel.id !== channelIDTwo) return

    await mongo().then(async mongoose => {
        try {
            var result = await userInvenSchema.findOne({
                _id: message.author.id
            })
            if (result) {
                if (result.count !== 151){
                    message.reply(`It looks like you haven't caught enough pokemon (${result.count} out of 151)!`)
                } else {
                    message.reply(`Congratulations! You have become a Gen 1 Pokemon Master!`)
                }
            } else {
                message.reply(`it appears you have not started your Pokemon adventure.`)
            }
        } finally {
            mongoose.connection.close()
        }
    })
}