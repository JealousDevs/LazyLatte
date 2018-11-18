const Discord = module.require("discord.js");
var Gyazo = require("gyazo-api");
var client = new Gyazo("551b2eea4da164db228a0d3aaaa9a6e1a6e43d6a66f73dd32988227bbd8a0b49")

module.exports.run = async (client, message, args) => {
message.delete()



		var oof = [
							"Signs point to yes.",
							"Signs point to no.",
							"Outlook not so good. :disappointed:",
							"It is certain. :smile:",
							"Reply is hazy, try again. :wink: ",
							"Yep.",
							"Nope.",
							"Better not tell you now. :smiling_imp:",
							"My reply would be yes.",
							"My reply is no.",
							"Concentrate and ask again. :thinking:",
							"Cannot predict now.",
							"Ask again later.",
							"Without a doubt! :grin:",
							"You may rely on it. :wink:",
							"You may not rely on it.",
							"Outlook good. :slight_smile:",
							"Don't count on it. :imp:"
						];
					
					var result = Math.floor((Math.random() * oof.length) + 0);
						if(!args[1]) return message.channel.send("Ah Geez! Are you going to ask a question?");
							if(!message.content.includes("?")) return message.channel.send("Use a `?`. Be educated, client! :joy:");

						let embed = new Discord.RichEmbed()
							.setColor("#000000")
							.setTitle(`:grey_question: ${args.slice(0).join(' ')}`)
							.setDescription(`:8ball: ${oof[result]}`)
							.setTimestamp()
							.setFooter(`Question asked by: ${message.author.tag}`)

					message.channel.send({embed: embed});



}
module.exports.help = {
	name: "8ball",
	aliases: "8b"
}