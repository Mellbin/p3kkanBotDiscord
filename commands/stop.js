module.exports = {
    name: "stop",
    description: "stoppa musik",
    execute(message, args){
        const distube = require("../main");
        distube.stop(message);
        message.channel.send("music go stop").then(message =>{
          message.delete({ timeout: 20000})
        });
    }

}