const Discord = require('discord.js');
const DisTube = require("distube")
const sql = require("mySql");
const { dcToken } = require('./config');
const config = require('./config');
const fs = require("fs.js");

const client = new Discord.Client();
const distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
const prefix = "!";

const fs = require (`fs`);
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

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

client.login(config.dcToken);
client.once("ready", () => {
    
    
    console.log("pekkan is ready");  
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

    if (command === "play"){
      try {
        distube.play(message, args.join(" "));
      } catch (error) {
        console.log(error)
      }
    }
    else if (command === "stop"){
      distube.stop(message);
      message.channel.send("music go stop").then(message =>{
        message.delete({ timeout: 20000})
      })
    
    } 
    else if (command == "skip"){
        distube.skip(message);
      }
    else if (command == "queue") {
      try {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n")).then(message =>{
          message.delete({ timeout: 20000})
        })
      } catch (error) {
        console.log(error);
      }
      
    }

    //music command2
    else if(command === "banger"){
        if(randomInt(1, 5) === 1){
            message.channel.send("https://www.youtube.com/watch?v=fH1PSDZOtn0");
        }
        else if (randomInt(1,5) === 2){
            message.channel.send("https://www.youtube.com/watch?v=w2IhccXakkE");
        }
        else if (randomInt(1,5) === 3){
        message.channel.send("https://www.youtube.com/watch?v=cCyDTsR3Z-8");
        }
        else if (randomInt(1,5) === 4){
        message.channel.send("https://www.youtube.com/watch?v=_L2vJEb6lVE");
        }
        else if(randomInt(1,5) === 5){
            message.channel.send("https://www.youtube.com/watch?v=eCGV26aj-mM");
            }

      else if(command === "updateinfo"){
        try{
        client.user.setActivity("Handlar järnrör på svarta marknaren");
        client.user.setUsername("Diktatorn's au pair")
        client.user.setAvatar("https://c.stocksy.com/a/jq3800/z9/1921425.jpg")
      }
        catch(error){
          console.log(error) //Hella not working idk why, den fungerar även inte i externt
        } 
    }
  }    
})

client.login(`ODMxOTgzMTY5MDQ0NzQyMjI0.YHdKtQ._b3xPekmRpWCsqTUm3uZpzyThuE`);