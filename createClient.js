const Discord = require('discord.js');
const { dcToken } = require('./config');
const client = new Discord.Client();
client.commands = new Discord.Collection();

module.exports = client;