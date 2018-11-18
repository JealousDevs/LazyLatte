const Discord = module.require("discord.js");
var moment = module.require('moment');

module.exports.run = async (client, message, args) => {
message.delete()

		if(!message.member.hasPermission('BAN_MEMBERS')) {
			return message.channel.send("Ah Geez! You don't have the `BAN_MEMBERS` permission!").then(m => m.delete(5000));		
		}

			let target = message.mentions.users.first();
				let toBan = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
						if(!toBan) return message.channel.send('You must specify a user mention to ban!').then(m => m.delete(5000));

			
			if(toBan.id === message.author.id) return message.channel.send("Ah Geez! You can't ban yourself, now why would you do that?").then(m => m.delete(5000));				
				if(toBan.highestRole.position >= message.member.highestRole.position) return;

			let reason = args.slice(1).join(' ');
				if(!reason) {
					reason = 'No reason specified!'
				}

				await toBan.ban(reason)
					.catch(error => console.log(error))
						message.channel.send(`:white_check_mark: ***${target.tag} was banned!***`);

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

		let cb = "`";
		let time = moment(Date.now()).format('M / D / YY, @h:mm a')
			setTimeout(function() { channel.send({embed: new Discord.RichEmbed()
					.setColor('#07a6a7')
					.setThumbnail('https://i.gyazo.com/a9b6a144f4001fc1dbf7e00b20ce0d22.png')
					.setAuthor(`${target.id} | Ban`)
					.setFooter(`UserID: ${target.id}`)
					.addField('User', target, true)
					.addField('Moderator', message.author, true)
					.addField('Reason', reason)
					.addField('Time', time, true)
			 });  }, 5000);
				target.send(`You were banned from **${message.guild.name}**.\n*Reason:* ${cb}${reason}${cb}`)


}
module.exports.help = {
	name: "ban",
	aliases: 'b'
}