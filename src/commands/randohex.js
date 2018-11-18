const Discord = require("discord.js")
var randomHex = require("random-hex-color");

module.exports.run = async (client, message, args) => {
	message.delete();

	let color = randomHex()

	let rando = new Discord.RichEmbed()
		.setColor(`${color}`)
		.setDescription(`Hex: ${color}`)

		message.channel.send({embed: rando})
}
module.exports.help = {
	name: "randomhex",
	aliases: "rhex"
}