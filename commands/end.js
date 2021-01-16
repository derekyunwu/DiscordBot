const Discord = require('discord.js')
const mongo = require('../src/mongo')
const userInvenSchema = require('../schemas/inventory-schema')

module.exports = async (message) => {
    if (message.channel.type !== "dm") return
    // check if that user id already exists

    await mongo().then(async mongoose => {
        try {
            var result = await userInvenSchema.findOne({
                _id: message.author.id
            })
            if (!result) {
                message.channel.send("It looks like you've haven't started your Pokemon adventure!\n" +
                    "Type **!start** to begin your Pokemon adventure.")
            } else {
                await userInvenSchema.findOneAndDelete({
                    _id: message.author.id
                })
                message.channel.send("Your progress has been wiped and cannot be recovered.\n" + 
                "Sorry to hear you will be leaving us :(")
            }
        } finally {
            mongoose.connection.close()
        }
    })
}