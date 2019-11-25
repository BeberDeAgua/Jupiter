var dotenv = require('dotenv');
dotenv.config();
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
		url: 'https://imgur.com/kLfFnBD',
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
		icon_url: 'https://imgur.com/kLfFnBD',
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
              msg.author.send("Working on connecting username \`" + args[0] + "\` to your account, " + msg.author.username + ". . .");
              const data = JSON.stringify({thing: args[0], discName: msg.author.username});
              
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

