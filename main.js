const sql = require("mySql");
const config = require('./config');
const fs = require (`fs`);
const client = require("./createClient");
const DisTube = require("distube");
const play = require('./commands/play');


const distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
const prefix = "!";



const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.login(config.dcToken);
client.once("ready", () => {
    console.log("pekkan is ready");  
});


function randomInt(low, high) { //funktion för val av banger
  return Math.floor(Math.random() * (high - low) + low)
}

distube
    .on("playSong", (message, queue, song) => message.channel.send(
      `Playing \`${song.name}\` - \`${song.formattedDuration}\`\n`
    ).then(message =>{
      message.delete({ timeout: 120000 /*time unitl delete in milliseconds*/});
      console.log("deleted msg")
    }))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ).then(message =>{
      message.delete({ timeout: 20000})
    }))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n`
    ).then(message =>{
      message.delete({ timeout: 2000})
    }))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n`
    ).then(message =>{
      message.delete({ timeout: 20000})
    }))
    .on("searchResult", (message, result) => {
      let i = 0;
      message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`).then(message =>{
        message.delete({ timeout: 2000})
      });
  });


client.on (`message`, message =>{
  if (!message.content.startsWith(prefix) || message.author.bot) return;
      
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLocaleLowerCase();
  
  if(!client.commands.has(command));
  try {
      client.commands.get(command).execute(message, args);
  }catch(error){
    console.log(error)
  }

  });

module.exports = distube;

