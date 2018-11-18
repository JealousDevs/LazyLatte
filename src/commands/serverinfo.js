const Jimp = require('jimp');
const Discord = require('discord.js');
var randomHex = require("random-hex-color");
var moment = require('moment')

module.exports.run = async (client, message, args) => {
message.delete();

color = randomHex();

var mVar = message.guild.memberCount
var mCount = mVar - 1 

let createdA = moment(message.guild.createdAt).format('dddd, MMMM Do, YYYY | @h:mm:ss a')

var roles = message.guild.roles.size - 1

let serverInfo = new Discord.RichEmbed()
    .setColor(color)
    .setAuthor(`${message.guild.name} | Server Info`, message.guild.iconURL)
    .setThumbnail(message.guild.iconURL)
    .addField('Name', message.guild.name, true)
    .addField('Owner', message.guild.owner, true)
    .addField('Members', mCount, true)
    .addField('Role Count', roles, true)
    .addField('Channels', message.guild.channels.size, true)
    .addField('Region', message.guild.region, true)
    .setFooter(`This guild was created on: ${createdA}`)



message.channel.send(serverInfo)

}
module.exports.help = {
	name: "serverinfo",
	aliases: 'sinfo'
}