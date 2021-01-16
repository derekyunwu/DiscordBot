const Discord = require('discord.js')

module.exports = (message) => {
    message.reply(
        "I support the following commands:\n\n" +
        "**!help** - Displays my active commands\n" + 
        "**!intro** - Displays a welcome description for new users\n" + 
        "**!start** - Claims **Pokemon Trainer** role / Can begin catching Pokemon\n" + 
        "**!generate** - Randomly returns an image of a Gen 1 Pokemon\n" + 
        "**!catch <pokemon-name>** - Adds pokemon to personal inventory if <pokemon-name> is correct / Can only be used if a wild Pokemon has appeared\n" + 
        "**!inventory** - Prints a list of Pokemon in user inventory\n" + 
        "**!roll** - Uses dupe credits and rolls for a random Pokemon\n" +
        "**!credits** - Displays the number of credits + rolls usable for the REM\n" +
        "**!claim** - Awards **Pokemon Master** role if user has caught all 151 Pokemon\n" +
        "**!end** - Forfeit **Pokemon Trainer** role / All data is purged\n" 
    )
}