// const bronzeTier = {
//     1: 'Bulbasaur', 4: 'Charmander', 7: 'Squirtle', 10: 'Caterpie',
//     13: 'Weedle', 16: 'Pidgey', 19: 'Rattata', 21: 'Spearow', 23: 'Ekans',
//     27: 'Sandshrew', 29: 'Nidoran-F', 32: 'Nidoran-M', 41: 'Zubat',
//     43: 'Oddish', 46: 'Paras', 60: 'Poliwag', 63: 'Abra', 66: 'Machop', 
//     69: 'Bellsprout', 74: 'Geodude', 81: 'Magnemite', 84: 'Doduo',
//     92: 'Gastly', 98: 'Krabby', 100: 'Voltorb', 102: 'Exeggcute', 
//     104: 'Cubone', 109: 'Koffing', 116: 'Horsea', 118: 'Goldeen',
//     129: 'Magikarp', 147: 'Dratini'
// }

const bronzeTier = [
    'Bulbasaur', 'Charmander', 'Squirtle', 'Caterpie',
    'Weedle', 'Pidgey', 'Rattata', 'Spearow', 'Ekans',
    'Sandshrew', 'Nidoran-F', 'Nidoran-M', 'Zubat',
    'Oddish', 'Paras', 'Poliwag', 'Abra', 'Machop', 
    'Bellsprout', 'Geodude', 'Magnemite', 'Doduo',
    'Gastly', 'Krabby', 'Voltorb', 'Exeggcute', 
    'Cubone', 'Koffing', 'Horsea', 'Goldeen',
    'Magikarp'
]

// const silverTier = {
//     2: 'Ivysaur', 5: 'Charmeleon', 8: 'Wartortle', 11: 'Metapod',
//     14: 'Kakuna', 17: 'Pidgeotto', 20: 'Raticate', 22: 'Fearow', 24: 'Arbok', 25: 'Pikachu',
//     28: 'Sandslash', 30: 'Nidorina', 33: 'Nidorino', 35: 'Clefairy', 37: 'Vulpix', 39: 'Jigglypuff', 42: 'Golbat',
//     44: 'Gloom', 47: 'Parasect', 48: 'Venonat', 50: 'Diglett', 52: 'Meowth', 54: 'Psyduck', 56: 'Mankey',
//     58: 'Growlithe', 61: 'Poliwhirl', 64: 'Kadabra', 67: 'Machoke', 
//     70: 'Weepinbell', 72: 'Tentacool', 75: 'Graveler', 77: 'Ponyta', 79: 'Slowpoke', 82: 'Magneton', 
//     83: 'Farfetch\'d', 85: 'Dodrio', 86: 'Seel', 88: 'Grimer', 90: 'Shellder',
//     93: 'Haunter', 95: 'Onix', 96: 'Drowzee', 99: 'Kingler', 101: 'Electrode', 103: 'Exeggutor', 
//     105: 'Marowak', 106: 'Hitmonlee', 107: 'Hitmonchan', 108: 'Lickitung', 110: 'Weezing', 111: 'Rhyhorn', 
//     113: 'Chansey', 114: 'Tangela', 117: 'Seadra', 119: 'Seaking', 120: 'Staryu', 
//     127: 'Pinsir', 128: 'Tauros', 133: 'Eevee', 137: 'Porygon', 138: 'Omanyte', 147: 'Dratini'
// }

const silverTier = [
    'Ivysaur', 'Charmeleon',  'Wartortle', 'Metapod',
    'Kakuna',  'Pidgeotto',  'Raticate',  'Fearow',  'Arbok',  'Pikachu',
   'Sandslash', 'Nidorina',  'Nidorino',  'Clefairy',  'Vulpix','Jigglypuff',  'Golbat',
     'Gloom',  'Parasect',  'Venonat',  'Diglett',  'Meowth', 'Psyduck', 'Mankey',
    'Growlithe',  'Poliwhirl',  'Kadabra',  'Machoke', 
     'Weepinbell',  'Tentacool',  'Graveler', 'Ponyta',  'Slowpoke','Magneton', 
     'Farfetch\'d',  'Dodrio',  'Seel',  'Grimer',  'Shellder',
     'Haunter',  'Onix', 'Drowzee', 'Kingler',  'Electrode',  'Exeggutor', 
     'Marowak',  'Hitmonlee',  'Hitmonchan',  'Lickitung',  'Weezing',  'Rhyhorn', 
     'Chansey',  'Tangela',  'Seadra', 'Seaking',  'Staryu', 
    'Pinsir', 'Tauros',  'Eevee',  'Porygon',  'Omanyte',  'Dratini'
]

// const goldTier = {
//     3: 'Venusaur', 6: 'Charizard', 9: 'Blastoise', 12: 'Butterfree',
//     15: 'Beedrill', 18: 'Pidgeot', 21: 'Spearow', 23: 'Ekans', 26: 'Raichu',
//     31: 'Nidoqueen', 34: 'Nidoking', 36: 'Clefable', 38: 'Ninetales', 40: 'Wigglytuff',
//     45: 'Vileplume', 49: 'Venomoth', 51: 'Dugtrio', 53: 'Persian', 55: 'Golduck', 57: 'Primeape',
//     59: 'Arcanine', 62: 'Poliwrath', 65: 'Alakazam', 68: 'Machamp', 
//     71: 'Victreebel', 73: 'Tentacruel', 76: 'Golem', 78: 'Rapidash', 80: 'Slowbro', 87: 'Dewgong',
//     89: 'Muk', 91: 'Cloyster', 94: 'Gengar', 97: 'Hypno', 112: 'Rhydon', 115: 'Kangaskhan', 
//     121: 'Starmie', 122: 'Mr. Mime', 123: 'Scyther', 124: 'Jynx', 125: 'Electabuzz',
//     126: 'Magmar', 130: 'Gyarados', 131: 'Lapras', 132: 'Ditto', 
//     134: 'Vaporeon', 135: 'Jolteon', 136: 'Flareon', 139: 'Omastar', 140: 'Kabuto', 143: 'Snorlax', 148: 'Dragonair'
// }

const goldTier = [
    'Venusaur', 'Charizard','Blastoise',  'Butterfree',
    'Beedrill', 'Pidgeot', 'Spearow', 'Ekans', 'Raichu',
    'Nidoqueen', 'Nidoking',  'Clefable',  'Ninetales',  'Wigglytuff',
    'Vileplume', 'Venomoth',  'Dugtrio',  'Persian', 'Golduck',  'Primeape',
    'Arcanine', 'Poliwrath',  'Alakazam', 'Machamp', 
    'Victreebel', 'Tentacruel',  'Golem',  'Rapidash',  'Slowbro',  'Dewgong',
    'Muk', 'Cloyster',  'Gengar', 'Hypno',  'Rhydon', 'Kangaskhan', 
    'Starmie', 'Mr. Mime', 'Scyther',  'Jynx',  'Electabuzz',
    'Magmar', 'Gyarados',  'Lapras', 'Ditto', 
    'Vaporeon', 'Jolteon',  'Flareon',  'Omastar', 'Kabuto',  'Snorlax',  'Dragonair'
]

// const diamondTier = { 
//     141: 'Kabutops', 142: 'Aerodactyl', 144: 'Articuno', 145: 'Zapdos', 
//     146: 'Moltres', 149: 'Dragonite', 150: 'Mewtwo', 151: 'Mew'
// }

const diamondTier = [
    'Kabutops', 'Aerodactyl', 'Articuno', 'Zapdos', 
    'Moltres', 'Dragonite', 'Mewtwo', 'Mew'
]

const dropBS = 0.5
const dropSG = 0.8
const dropGD = 0.97

const bronzeSize = 32
const silverSize = 62
const goldSize = 52
const diamondSize = 8

// var bronzeCount = 0
// var silverCount = 0
// var goldCount = 0
// var diamondCount = 0

// for (var i = 0; i < 100; i ++){
//     var randomVal = Math.random();
// if (randomVal < dropBS){
//     bronzeCount++
// } else if (randomVal < dropSG){
//     silverCount++
// } else if (randomVal < dropGD){
//     var randomIndex = Math.floor( (Math.random() * goldSize) + 1);
//     goldCount++
// } else {
//     var randomIndex = Math.floor( (Math.random() * diamondSize) + 1);
//     diamondCount++
// }
// }

// console.log(`Bronze: ${bronzeCount}\nSilver: ${silverCount}\nGold: ${goldCount}\nDiamond: ${diamondCount}`)

module.exports = () => {
    var randomVal = Math.random();
    var pokemon;
    var tier;
    if (randomVal < dropBS){
        var randomIndex = Math.floor( (Math.random() * bronzeSize));
        pokemon = bronzeTier[randomIndex]
        tier = "bronze"
    } else if (randomVal < dropSG){
        var randomIndex = Math.floor( (Math.random() * silverSize));
        pokemon = silverTier[randomIndex]
        tier = "silver"
    } else if (randomVal < dropGD){
        var randomIndex = Math.floor( (Math.random() * goldSize));
        pokemon = goldTier[randomIndex]
        tier = "gold"
    } else {
        var randomIndex = Math.floor( (Math.random() * diamondSize));
        pokemon = diamondTier[randomIndex]
        tier = "diamond"
    }
    return [pokemon, tier]
}