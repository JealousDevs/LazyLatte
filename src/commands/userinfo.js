const Discord = require("discord.js");
var moment = require('moment');
var Jimp = require("jimp");
var moment = require('moment-timezone');
const snek = module.require("snekfetch");
var fs = require('fs');
var Gyazo = require("gyazo-api");
var client = new Gyazo("551b2eea4da164db228a0d3aaaa9a6e1a6e43d6a66f73dd32988227bbd8a0b49")


module.exports.run = async (client, message, args) => {
	message.delete();

	let target = message.mentions.users.first() || message.author;
     let target2 = message.guild.member(message.mentions.users.first()) || message.guild.member(message.author);

var p1 = Jimp.read(target.displayAvatarURL);
var p2 = Jimp.read("https://i.imgur.com/nhrXBnO.png");

let status = target2.presence.status;
  if(status === "online") {
    status = 'https://i.imgur.com/ljYh5Vu.png'
  }
    if(status === 'idle') {
      status = 'https://i.imgur.com/VxvtckP.png'
    }
      if(status === 'dnd') {
        status = 'https://i.imgur.com/BTqEG4d.png'
      }
        if(status === 'offline') {
          status = 'https://i.imgur.com/meStgMQ.png'
        }

let stat = Jimp.read(status);
Promise.all([p1, p2, stat]).then(function(images){
    var pfp = images[0];
    var mask = images[1];
    var stats = images[2];
        stats = stats.resize(300, 300);
        pfp.resize(1024, 1024)
        mask.resize(1024, 1024)
        let maskk = pfp.mask(mask, 0, 0);
          maskk.composite(stats, 630, 730).write(`./src/images/pfps/${target.id}-pfp-edit.png`);

});





var name = `./src/images/pfps/${target.id}-pfp-edit.png`;

     let game = target.presence.game;  
        if(!game){
            game = "Nothing".toString();
        } else {
            game = target.presence.game.name
        }
        

            let nick = target2.nickname;
                if(!nick) {
                    nick = "No nickname."
                }
        




           		let diff1 = moment().diff(target.createdAt, 'years', true);
           			let diff2 = moment().diff(target.joinedAt, 'years', true);



                let date = moment(target2.joinedTimestamp).tz("America/Chicago").format("dddd, MMMM Do, YYYY");
                    let register = moment(target.createdAt).tz("America/Chicago").format("dddd, MMMM Do, YYYY");
                        let timestamp = moment(Date.now()).format("M/D/YY");
                             let time = moment(Date.now()).format("h:mm:ss a");
                                
                           

                		var roles = target2.roles.size - 1;
                            
                            
                            let highRole = target2.highestRole;
                                if(roles === 0) {
                                    highRole = "No roles"
                                }


                                    let display = target2.displayHexColor
                                        if(display === "#000000") {
                                            display = "No roles"
                                        }


            setTimeout(function() { fs.unlinkSync(name) }, 10000);

                        setTimeout(function() { client.upload(`${name}`).then(function(res){

               
                	let uiEm = new Discord.RichEmbed()
                		.setColor(target2.displayColor || "#cb94d6")
                		.setAuthor(`${client.user.username} | ${target.username} | Userinfo`, client.user.displayAvatarURL)
                		.setDescription(`This user has ${roles} roles!`)
                        .setTimestamp()
                		.setThumbnail(res.data.url)
                        .setFooter(`${target.username}'s ID: ${target.id}`)
                		.addField("User:", target, true)
                		.addField("Nickname:", nick, true)
                		.addField("Playing:", game, true)
                		// .addField("User ID:", target.id, true)
                		// .addField("Highest Role ID:", target2.highestRole.id, true)
                		.addField("Highest Role:", highRole, true)
                		.addField(`Joined ${message.guild.name}:`, `${date}`, true)
                		.addField(`Signed up for Discord:`, register, true)
                        message.channel.send({embed: uiEm})
                		});
                }, 1400);


                		
}
module.exports.help = {
	name: "userinfo",
	aliases: "ui"
}