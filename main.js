var dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    var rawmsg = msg.content;
    var command = rawmsg.slice(1);
    console.log(command);
    if (rawmsg.slice(0, 1) == process.env.PREFIX) {
      if (command === 'ping') {
        msg.reply('Pong.');
      } else if (command == 'dmMe') {
        msg.author.send("Hi, I've DMed you.")
      }
    };
});

client.login();
