console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV) { require('dotenv').config() };
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    var rawmessage = msg.content;
    var i
    var command = ""
    for (i = 0, rawmessage.charAt(i) !== " ", i++) {
        command + rawmessage.charAt(i)
    }
    if (msg.slice(0, 1) = process.env.PREFIX) {
      if (command === 'ping') {
        msg.reply('pong');
      }
   )
});

client.login();
