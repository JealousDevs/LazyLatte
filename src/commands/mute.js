const Discord = require("discord.js");
var moment = require('moment');
const fs = require('fs');
var moment = require('moment-timezone');

module.exports.run = async (client, message, args) => {
message.delete()

	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ah Geez! You don't have the `MANAGE_MESSAGES` permssion!").then(m => m.delete(2500));

		let target = message.mentions.users.first();
			let toMute = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);


		if(!toMute) return message.channel.send("Must specify someone to mute!").then(m => m.delete(2500));	
			if(toMute.id === message.author.id) return message.channel.send("Ah Geez! You can't mute yourself, why'd you want to do that?").then(m => m.delete(2500));
				if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("Ah Geez! Are they higher or equal to you?").then(m => m.delete(2500));


			let reason = args.slice(2).join(' ');
				if(!reason) {
					reason = "No reason specified."
				}

			let time = args[1]
				if(!time) {
					time = 60
				}
				if(time > 10080) return message.channel.send("7 days is the max amount of time for a mute!").then(m => m.delete(2500));


			let role = message.guild.roles.find(r => r.name === "Muted");
				if(!role) {
					try {
						role = await message.guild.createRole({
							name: "Muted",
							color: "#000000",
							permissions: []
						});

						message.guild.channels.forEach(async (channel, id) => {
							await channel.overwritePermissions(role, {
								SEND_MESSAGES: false, 
								ADD_REACTIONS: false,
								USE_VAD: false,
								SPEAK: false
						});
					});		
				} catch(e) {
					console.log(e.stack);
				}
			}


				if(toMute.roles.has(role.id)) return message.channel.send("User is already muted!").then(m => m.delete(2500));


					let muteTime = Date.now() + parseInt(time) * 60000
						

				client.mutes[toMute.id] = {
					guild: message.guild.id,
					guildName: message.guild.name,
					time: muteTime
				}

			await toMute.addRole(role);

					fs.writeFile("./src/data/mutes.json", JSON.stringify(client.mutes, null, 4), err => {
						if(err) throw err;
							message.channel.send(`**:white_check_mark: ${target.tag} was muted!**`).then(m => m.delete(5000));
					});

					const channel = message.guild.channels.find('name', 'mod-logs');
			if(!channel) {
					let cateID = message.guild.channels.find('name', 'LOGGINGS')
				let category = message.guild.createChannel('LOGGINGS', 'category', [{
  				id: '5465421613135641321',
  				deny: ['VIEW_CHANNEL'],
  				allow: ['EMBED_LINKS'],


		}]).catch(console.error);
				
				let mchannel = setTimeout(function() { message.guild.createChannel('mod-logs', 'text' [{
					deny: ['VIEW_CHANNEL'],
					allow: [''],
				}]).then(mchannel => mchannel.setParent(message.guild.channels.find('name', 'LOGGINGS').id)).catch(console.error);
			}, 5000);
		
				setTimeout(function() { message.channel.send("Category `LOGGINGS` and channel `mod-logs` was made for mod-logs. You may set any perms and move the category or channel where ever is suitable for your server!").then(m => m.delete(3000)); }, 3000);
		}

			let muted = new Discord.RichEmbed()
					.setColor("#1bcc04")
					.setAuthor(`${target.tag} | Mute`)
					.setThumbnail('https://i.gyazo.com/a9b6a144f4001fc1dbf7e00b20ce0d22.png')
					.setTimestamp()
					.setFooter(`UserID: ${target.id}`)
					.addField("User", target, true)
					.addField("Moderator", message.author, true)
					.addField("Reason", reason, true)
					.addField("Time", time, true)

					await channel.send({embed: muted});
						target.send(`You were muted in ${message.guild.name}.\n**Reason:** ${reason}`);

}
module.exports.help = {
	name: "mute",
	aliases: "m"
}