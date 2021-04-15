module.exports = {
    name: "skip",
    description: "skippa musik",
    execute(message, args){
        const distube = require("../main");
        distube.skip(message);
    }

}