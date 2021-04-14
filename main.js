const Discord = require('discord.js');
const DisTube = require("distube")
const sql = require("mySql");
const config = require('./config');




const client = new Discord.Client();
const distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });


distube
    .on("playSong", (message, queue, song) => message.channel.send(
      `Playing \`${song.name}\` - \`${song.formattedDuration}\`\n`
    ).then(message =>{
      message.delete({ timeout: 80000 /*time unitl delete in milliseconds*/});
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


  

var dcID = 809463692176785454;
const prefix = "!";

client.login(dcToken);
client.once("ready", () => {
    
    
    console.log("pekkan is ready");  
});

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
  }

 



client.on("message", message => {
  try {
    if(!message.content.startsWith(prefix) ||  message.author.bot) return;
    console.log("fick medelandet " + message.content);
    
    
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    message.delete({timeout: 4000})
    console.log("command: " + command + " Args:" + args)
    //music commands
  
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
    //vanliga commands

    else if(command === "lugnapuckar"){
        message.channel.send("https://youtu.be/CQmQgwu6E-E?t=155").then(message =>{
          message.delete({ timeout: 20000})
        })
    } 
    else if(command === "hampus"){
        message.channel.send("https://www.meme-arsenal.com/memes/c31731a2f0dbefb8b4f5abeed771c721.jpg").then(message =>{
          message.delete({ timeout: 20000})
        })
   
        message.channel.send("Look at his retaaard").then(message =>{
          message.delete({ timeout: 20000})
        })
    }
    else if(command === "fabian"){
        message.channel.send("https://cdn.discordapp.com/attachments/556158199598809098/831198413122699284/D0k5xhoWkAIYS88.png").then(message =>{
          message.delete({ timeout: 20000})
        })
        message.channel.send("wheelchair go brrrrr").then(message =>{
          message.delete({ timeout: 20000})
        })
    }
    else if(command === "simon"){
        message.channel.send("https://imgs.aftonbladet-cdn.se/v2/images/09d77d41-7374-4f0d-86c1-586ee14a9eca?fit=crop&h=1000&q=50&w=704&s=6c0e2f328d642fef38529ad107dfc9c0534a04e8").then(message =>{
          message.delete({ timeout: 20000})
        })
        message.channel.send("our lord and savior the DIKTATOR p3kkan <3").then(message =>{
          message.delete({ timeout: 20000})
        })
    }
    else if(command === "help"){
        message.channel.send("Pröv mä !lugnapuckar, !hampus, !fabian, !simon, !help, !help2, !stonks, !fredag, !fabiansTjej. and more to come").then(message =>{
          message.delete({ timeout: 20000})
        })
        
    }
    else if(command === "help2"){
        message.channel.send("Rawr X3 *nuzzles* How are you? *pounces on you* you're so warm o3o *notices you have a bulge* someone's happy! *nuzzles your necky wecky* ~murr~ hehe ;) *rubbies your bulgy wolgy* you're so big! *rubbies more on your bulgy wolgy* it doesnt stop growing ./. *kisses you and licks your neck* daddy likes ;) *nuzzle wuzzle* I hope daddy likes *wiggles butt and squirms* I wanna see your big daddy meat! *wiggles butt* I have a little itch o3o *wags tails* can you please get my itch? *put paws on your chest* nyea~ its a seven inch itch *rubs your chest* can you pwease? *squirms* pwetty pwease? :( I need to be punished *runs paws down your chest and bites lip* like, I need to be punished really good *paws on your bulge as I lick my lips* Im getting thirsty. I could go for some milk *unbuttons your pants as my eyes glow* you smell so musky ;) *licks shaft* mmmmmmmmmmmmmmmmmmm so musky ;) *drools all over your cawk* your daddy meat. I like. Mister fuzzy balls. *puts snout on balls and inhales deeply* oh my gawd. Im so hard *rubbies your bulgy wolgy* *licks balls* punish me daddy nyea~ *squirms more and wiggles butt* I9/11 lovewas an yourinside muskyjob goodness *bites lip* please punish me *licks lips* nyea~ *suckles on your tip* so good *licks pre off your cock* salty goodness~ *eyes roll back and goes balls deep").then(message =>{
          message.delete({ timeout: 4000})
        })
        
    }
    else if(command === "stonks"){
        message.channel.send("https://www.youtube.com/watch?v=_SB3an68ZiI&t=37s").then(message =>{
          message.delete({ timeout: 20000})
        })
        
    }
    else if(command === "fredag"){
        message.channel.send("https://i.redd.it/xhp7hnao3r921.jpg").then(message =>{
          message.delete({ timeout: 20000})
        })
        
    }
      else if(command === "updateinfo"){
       try{
        client.user.setActivity("Handlar järnrör på svarta marknaren");
        client.user.setUsername("Diktatorn's au pair")
        client.user.setAvatar("https://c.stocksy.com/a/jq3800/z9/1921425.jpg")
        }
      catch(err){
        console.log(err)
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
    }
    else{
      message.channel.send("no habla espanjål");
       
       }

  } catch (error) {
        console.log(error);
      }

}, );