module.exports = {
    name: `play`,
    description: "spela musik",
    execute(message, args){
        const distube = require("../main.js");
        console.log("idiot");
        distube.play(message, args.join(" "));
           
    }
};
