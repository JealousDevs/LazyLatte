const Discord = module.require("discord.js");
const client = require("./client.json");
const fs = module.require("fs");
// const db = require('quick.db');
const prefix = client.prefix

const token = process.env.token


const client = new Discord.Client({disableEveryone: true});

	client.mutes = require("./data/mutes.json")

	client.on('ready', () => {
		console.log("Am on.");





	client.user.setStatus('dnd');
		client.user.setActivity(`${client.guilds.size} servers!`, {
			'type': 'WATCHING'
		});
});


client.commands = new Discord.Collection();
	
fs.readdir("./src/commands/", (err, files) => {
	if(err) console.log(`${err}`);


	let jsfind = files.filter(f => f.split(".").pop() === "js");
		if(jsfind.length <= 0) {
			console.log("I couldn't find any commands, Rick..");
			return;
		}

		console.log(`Rick! I found ${jsfind.length} commands!`);

			jsfind.forEach ((f, i) => {
				let nameProp = require(`./commands/${f}`);
					client.commands.set(nameProp.help.name, nameProp);
		});
				jsfind.forEach ((f, i) => {
						let aliProp = require(`./commands/${f}`);	
							client.commands.set(aliProp.help.aliases, aliProp);
	});
});


client.on("message", async message => {
	if(message.author.client) return;
		if(message.channel.type === 'dm') return;
	
		


		let messageArray = message.content.split(' ');
		let command = messageArray[0];
			let args = messageArray.slice(1);

				if(!command.startsWith(prefix)) return;
						

		let cmd = client.commands.get(command.slice(prefix.length));
			if(cmd)	cmd.run(client, message, args, prefix);
					let cb = "`";
				if(!cmd) {
					setTimeout(function() { message.delete(); }, 2000)
					return message.channel.send(`\nAh Geez, Rick, that command doesn't exist! For a full list of commands do ${cb}${prefix}help${cb}`).then(m => m.delete(5000));
				
	}


	
					

});

client.login(token);