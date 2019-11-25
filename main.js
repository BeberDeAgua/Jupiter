var dotenv = require('dotenv');
dotenv.config();
const event = require('./MongoDB/Mongo.js');
const Discord = require('discord.js');
const https = require('https');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const helpEmbed = {
	color: 0xff5959,
	title: 'Hi!',
	description: "This is the list of Jupiter's commands. The bot itself is not very useful for purposes such as moderation, but it does help with Roblox - Discord verification.",
	thumbnail: {
		url: 'https://i.imgur.com/VzJKraW.png',
	},
	fields: [
		{
			name: '\`~help\`',
			value: 'Brings up this message here!',
		},
		{
			name: '\`~getCode <RobloxUsername>\`',
			value: 'Registers a new verification code under your Discord and Roblox accounts.',
			
		},
		{
			name: '\`~ping\`',
			value: 'Pong!',
			
		},
	],
	timestamp: new Date(),
	footer: {
		text: 'Jupiter, made with love~',
		icon_url: 'https://i.imgur.com/GXB5mV1.gif',
	},
};



client.on('message', msg => {
    const warnmsg = "Nothing to work with here. Missing arguments."
    var rawmsg = msg.content;
    var args = rawmsg.slice(1).split(/ +/g);
    var command = args.shift();
    if (rawmsg.slice(0, 1) == process.env.PREFIX) {
      if (command === 'ping') {
        msg.reply('Pong!');
      } else if (command == 'help') {
        msg.author.send({embed: helpEmbed});
      } else if (command == 'getCode') {
        if (args[0]) {
              msg.author.send("Getting code for \`" + args[0] + "\`, " + msg.author.username + ". . .");
              const data = JSON.stringify({thing: args[0], discName: msg.author.username});
              
              var req = https.request("https://jupiter-0.herokuapp.com/", {method: "GET"});
              req.write(data);
              req.end();
              event.on('Success', function(code){
                msg.author.send("Your code for \`" + args[0] + "\` is \`" + code + "\`.");
              };
              event.on('Faliure', function(code){
                msg.author.send("Code not found for user or you aren't the verified Discord account, pal.");
              }

          } else {
              msg.author.send(warnmsg);
          }
      } else if (command == 'makeCode') {
          if (args[0]) {
              msg.author.send("Working on connecting username \`" + args[0] + "\` to your account, " + msg.author.username + ". . .");
              const data = JSON.stringify({thing: args[0], discName: msg.author.username});
              
              var req = https.request("https://jupiter-0.herokuapp.com/", {method: "POST"});
              req.write(data);
              req.end();
              var succ = event.on('Success', function(code){
                msg.author.send("Made code: \`" + code + "\` and linked accounts. Do ***not*** share this code with anyone else, please.");
                succ.off('Success');
              };
              var fail = event.on('Faliure', function(code){
                msg.author.send("Code already exists for this user. If this is a mistake, please use the command \`~resetCode <RobloxUsername>\` to delete any connections made.");
                fail.off('Failure');
              };

          } else {
              msg.author.send(warnmsg);
          }
      }
    };
});



client.login();

