var dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const https = require('https');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    const warnmsg = "Nothing to work with here. Missing arguments."
    var rawmsg = msg.content;
    var args = rawmsg.slice(1).split(/ +/g);
    var command = args.shift();
    if (rawmsg.slice(0, 1) == process.env.PREFIX) {
      if (command === 'ping') {
        msg.reply('Pong.');
      } else if (command == 'dmMe') {
        msg.author.send("Hi, I've DMed you.")
      } else if (command == 'getCode') {
          if (args[0]) {
              msg.author.send("Working on it. \` ok \`");
              const data = JSON.stringify({
                thing: args[0]
              });
              
              var req = https.request("https://jupiter-0.herokuapp.com/", {method: "POST"});
              req.write(data);
              req.end();

          } else {
              msg.author.send(warnmsg);
          }
      }
    };
});



client.login();

