module.exports = {
    name: `updateinfo`,
    description: "uppdaterar dc",
    execute(message, args){
        const client = require("../createClient");
        try{
            client.user.setActivity("Handlar järnrör på svarta marknaren");
            client.user.setUsername("Diktatorn's au pair")
            client.user.setAvatar("https://c.stocksy.com/a/jq3800/z9/1921425.jpg")
          }
            catch(error){
              console.log(error) //Hella not working idk why, den fungerar även inte i externt
            } 
    }
};
