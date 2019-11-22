var dotenv = require('dotenv');
dotenv.config();
const Request = require('request');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    var rawmsg = msg.content;
    var command = rawmsg.slice(1);
    for (i = 0, command.charAt(i) !== " ", i++) {
      console.log(command.charAt(i))
    };
    console.log(rawmsg);
    if (rawmsg.slice(0, 1) == process.env.PREFIX) {
      if (command === 'ping') {
        msg.reply('Pong.');
      } else if (command == 'dmMe') {
        msg.author.send("Hi, I've DMed you.")
      } else if (command == 'verifyMe') {
        
        msg.author.send("Working on it.");
        
      }
    };
});

request.post('https://jupiter-0.herokuapp.com/', {
    'Lmao what' : 'lmbao'
});

client.login();

