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
            if (result) {
                message.reply("It looks like you've already started your Pokemon adventure!\n" +
                    "Type **!end** to wipe your data if you want to restart.")
            } else {
                await new userInvenSchema({
                    _id: message.author.id
                }).save()
                message.reply("Congratulations! You have started your Pokemon adventure. Happy hunting!")
            }
        } finally {
            mongoose.connection.close()
        }
    })
}