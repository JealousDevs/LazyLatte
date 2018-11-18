const Discord = module.require("discord.js");
const snek = module.require("snekfetch");
var omdb = module.require("omdb")

const api = "http://www.omdbapi.com/?t=";
const apikey = "&apikey=a53155f5";

module.exports.run = async (client, message, args) => {
	message.delete();
			let target = message.guild.member(message.author);
				let search = args.join('+');
					if(!search) return message.channel.send('Must specify a `movie` or `show` title!');
		var str = api + search + apikey;
		
			
			let title = (await snek.get(str)).body.Title
				let year = (await snek.get(str)).body.Year
			let imdbrating = (await snek.get(str)).body.imdbRating
				let image = (await snek.get(str)).body.Poster
			let rotten = (await snek.get(str)).body.imdbVotes
				let type = (await snek.get(str)).body.Type
			let awards = (await snek.get(str)).body.Awards
				let time = (await snek.get(str)).body.Runtime
			let genre =  (await snek.get(str)).body.Genre
				let plot = (await snek.get(str)).body.Plot
			let url = (await snek.get(str)).body.Website
				let series = (await snek.get(str)).body.totalSeasons
			let box = (await snek.get(str)).body.BoxOffice




				if(type === 'movie') {
					type = 'Movie'
				} 
					if(type === 'series') {
						type = 'Series'
					}

				if(!series) {
					series = "Not a series!"
				}
					if(!box) {
						box = "Still Unsure"
					}
					if(box === 'N/A') {
						box = 'Still Unsure'
					} else {
						box = `${box}`
					}

				if(awards === 'N/A') {
					awards = 'No awards.'
				} else {
					awards = `This ${type} has ${awards}`
				}
				if(!url) {
					url = ''
				} else {
					url = url
				}


					if((await snek.get(str)).body.Response === 'False') {
						return message.channel.send('*Movie or TV show does not exist, did you forget a space or mispell the title?*')
					} else {
				let movieSearch = new Discord.RichEmbed()
					.setColor(target.displayColor || "#cb94d6")
					.setAuthor(`${type}: ${title} | Released: ${year}`)
					.setURL(url)
					.setDescription(`BoxOffice: ${box}`)
					.setFooter(`Genres: ${genre}`)
					.setThumbnail(image)
					.addField('Plot:', plot, true)
					.addField('Rating:', imdbrating, true)
					.addField('Votes:', rotten, true)
					.addField(`This ${type}'s runtime: ${time}`, `${awards}`, true)
					.addField(`${type}'s seasons:`, series, true);
						message.channel.send({embed: movieSearch});
	}
}	

module.exports.help = {
	name: "movie",
	aliases: "ms"
}