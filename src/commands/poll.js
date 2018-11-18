const Discord = module.require("discord.js");
const agree = "👍";
const disagree = "👎";
var randomHex = require("random-hex-color");

module.exports.run = async (client, message, args) => {
message.delete()

let cb = "`"

let time = parseInt(args[0]) * 1000


let pollR = args.slice(1).join(' ');
	if(!pollR) return message.channel.send(`Usage:\n${cb}-poll (time [secs]) (poll reason)${cb}`).then(m => m.delete(3000));
	if(!pollR.includes("?")) return message.channel.send('Please include a `?` for the poll reason.').then(m => m.delete(3000));

const color = randomHex()

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("You do not have the `MANAGE_MESSAGES` permission, so I cannot start a poll!").then(m => m.delete(3000));

let embed = new Discord.RichEmbed()
	.setColor(color)
	.setTitle(`Poll | Poll ends in ${args[0]} seconds!`)
	.setDescription(`Poll: ${pollR}`)
	.addField('\u200B', `Vote for ${agree} if you agree!\nVote for ${disagree} if you disagree!`)
	.setTimestamp()
	.setFooter(`Poll started by: ${message.author.tag}`);


let msg = await message.channel.send(embed);

await msg.react(agree);
await msg.react(disagree);

	const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: time});
			let result;
			var agree1 = msg.reactions.get(agree).count-1
			var disagree1 = msg.reactions.get(disagree).count-1

			if(agree1 > disagree1) {
				result = "Yes won!"
			}
			if(agree1 < disagree1) {
				result = "No won!"
			}
			if(agree1 === disagree1) {
				result = "Tie, no one won!"
			}


		setTimeout(function() { msg.delete() }, time);
		setTimeout(function() { 
		let poll = new Discord.RichEmbed()
			.setColor(color)
			.setTitle(`Poll has ended!`)
			.setDescription(args.slice(1).join(' '))
			.addField('\u200B', `**Results:**`)
			.addField(`Voted for ${agree}`, agree1, true)
			.addField(`Voted for ${disagree}`, disagree1, true)
			.setTimestamp()
			.setFooter(`Result: ${result}`)

			message.channel.send(poll);
}, time);
}
module.exports.help = {
	name: "votepoll",
	aliases: "poll"
}