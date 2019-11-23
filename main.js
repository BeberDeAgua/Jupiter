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
    var args = rawmsg.slice(1).split(/ +/g);
    var command = args.shift();
    if (rawmsg.slice(0, 1) == process.env.PREFIX) {
      if (command === 'ping') {
        msg.reply('Pong.');
      } else if (command == 'dmMe') {
        msg.author.send("Hi, I've DMed you.")
      } else if (command == 'verifyMe') {
          if (args[0]) {
              msg.author.send("Working on it.");
          } else {
              msg.author.send("Nothing to work with here. Missing arguments.");
          }
      }
    };
});

Request.post('https://jupiter-0.herokuapp.com/', {
    'Lmao what' : 'lmbao'
});

client.login();

