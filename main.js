var dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const https = require('https');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const HelpEmbed = {
	color: 0xff5959,
	title: 'Hi!',
	description: "This is the list of Jupiter's commands. The bot itself is not very useful for purposes such as moderation, but it does help with Roblox - Discord verification.",
	thumbnail: {
		url: 'https://i.imgur.com/wSTFkRM.png',
	},
	fields: [
		{
			name: 'E',
			value: 'Some value here',
		},
		{
			name: 'A',
			value: 'Some value here',
			inline: true,
		},
		{
			name: 'Sports',
			value: 'Some value here',
			inline: true,
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
        msg.reply('Pong.');
      } else if (command == 'help') {
        msg.author.send(  
      } else if (command == 'getCode') {
          if (args[0]) {
              msg.author.send("Working on connecting username \`" + args[0] + "\` to your account, " + msg.author.username + ".");
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

