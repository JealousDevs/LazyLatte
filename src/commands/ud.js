const urban = module.require("urban");
const Discord = require("discord.js");
var moment = require('moment');


module.exports.run = async (client, message, args) => {
	message.delete();

                       let timestamp = moment(Date.now()).format("M-D-YY");
                             let time = moment(Date.now()).format("h:mm:ss a");


			if(args.length < 1) {
				urban.random().first(json => {
						let memberGuild = message.guild.member(message.author);
					let rando = new Discord.RichEmbed()
						.setColor(memberGuild.displayColor || "#cb94d6")
						.setAuthor(`Author of the definition: ${json.author}`)
						.setDescription(`*Random Word - ${json.word}*`)
						.addField(`Definition:`, json.definition)
						.addField("Examples:", json.example, true)
						.addField("\u200B", "**Votes:**")
						.addField(":smile:", `${json.thumbs_up}`, true)
						.addField(":angry:", json.thumbs_down, true)
						.addField("\u200B", `(Link - [Click here](${json.permalink}))`)
						.setTimestamp()
						.setFooter(`Word requested by ${message.author.tag}`, message.author.displayAvatarURL);

							message.channel.send({embed: rando});
				});
			} else {

						let str = args.join(' ');
							let memberGuild = message.guild.member(message.author);

						urban(str).first(json => {
									let shrug = new Discord.RichEmbed()
										.setColor("#5B8099")
										.setTimestamp()
										.setImage("https://i.imgur.com/fxP1n9z.png")
										.setFooter(" © JealousDevs", `https://i.imgur.com/qhjf3dq.jpg`)
										.setTitle(`There are no results for: ${str}`);

								if(!json) return message.channel.send({embed: shrug});

									let word = new Discord.RichEmbed()
							.setColor(memberGuild.displayColor || "#cb94d6")
							.setAuthor(`Author of the definition: ${json.author}`)
							.setDescription(`*Word - ${json.word}*`)
							.addField(`Definition:`, json.definition)
							.addField("Examples:", json.example, true)
							.addField("\u200B", "**Votes:**")
							.addField(":smile:", `${json.thumbs_up}`, true)
							.addField(":angry:", json.thumbs_down, true)
							.addField("\u200B", `(Link - [Click here](${json.permalink}))`)
							.setFooter(`Word requested by ${message.author.tag}`, message.author.displayAvatarURL)
							.setTimestamp();
								message.channel.send({embed: word});
						});
}

}
module.exports.help = {
	name: "define",
	aliases: "ud"
}