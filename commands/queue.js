module.exports = {
    name: "queue",
    description: "musik queue",
    execute(message, args){
        const distube = require("../main");
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

}