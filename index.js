// - Setup Variables
let ChannelID = '875023298034024448'; // the channel id of the bot channel
let Delay = 60*60; // Delay in seconds
let appID = '730'; // app id (730 = cs:go)
let PrivateMSG = true; // if you want the bot to send you a message if one of the servers is not updated
let AuthorUserID;
if(PrivateMSG)
	AuthorUserID = '137254857710108672' // your user id
let debug_mode = false; // set to true in order to get debug messages in the bot console

// - Servers
let Servers = [ // Add new servers by adding " 'IP:Port', " to the array below
	'185.185.134.51:5000',
	'185.185.134.51:5001',
	'185.185.134.51:5002',
	'185.185.134.51:5003',
	'185.185.134.51:5004',
	'185.185.134.51:5005',
	'185.185.134.51:5006',
	'185.185.134.51:5007',
];

// Text Variables
let UpToDate = '✅  Up to date';
let NotUpToDate = '❎  NOT up to date';
let Offline = '❎  Server is offline!'




// - Setup -
const Discord = require('discord.js'); // Important
const config = require("./config.json"); // Import the config
const { Client } = require('discord.js'); 
const client = new Client({ partials: ['MESSAGE', 'REACTION'] });
const chalk = require('chalk');		// not needed but cool tho, comment if you don't want to install chalk
const figlet = require('figlet'); 	// not needed but cool tho, comment if you don't want to install figlet
const fetch = require('node-fetch');
if(Servers.length > 0)
	query = require("source-server-query");

// - Login -
const PREFIX = config.PREFIX; // Used for future commands
client.login(config.token);	// Login to the bot, you must specify the bot token!

client.on('ready', () =>{
	// Check if chalk & figlet imported
	if(typeof chalk !== 'undefined' && typeof figlet !== 'undefined') {
		console.log(chalk.green(figlet.textSync('Valve Update Check', { horizontalLayout: 'full' })));
		console.log('============================================');
		console.log(chalk.red(`Bot started!\n---\n`
		+ `> Lodaded: ${Servers.length} Servers`));
		console.log('============================================');
	} 
	else
		console.log(`$ Valve Update Check is online.\n> Lodaded: ${Servers.length} Servers`);
		
	// you can set your custom status here =>
	client.user.setActivity(`🔥 Loaded ${Servers.length} Servers`, {type: "WATCHING"}).catch(console.error);

	// Start the main function
	data();
});

const msgSent = new Set(); // prevent double messages for 2 hours.

async function data()
{
	Debug('Data function loaded');
	let Timeout;
	clearTimeout(Timeout); // remove any other function timout to prevent double checking

	if(Servers.length < 1)
		return Err('You must specify your servers ip & port!');
	try {
		const Embed = new Discord.MessageEmbed()
			.setTitle(`Update Check`)
			.setFooter(`github.com/ShiNxz • Loaded ${Servers.length} Servers`)
			.setColor('RANDOM')
			.setTimestamp();

		const notUpdServers = [];

		// check if the last message in the specified channel is the bot message => if not -> create blank embed
		Debug(`Checking if channel id isn't empty`);
		if(!ChannelID) return Err('You must specify a channel id! please follow the guide in the github repo.');
		client.channels.cache.find(x => x.id === `${ChannelID}`).messages.fetch({ limit: 1 }).then(messages => {
			let lastMessage = messages.first();

			if(client.user.id != lastMessage.author.id) {
				Debug(`Couldn't find the bot message in the specified channel -> creating a blank embed`);
				CreateEmbed();
			}
		})
		.catch(console.error);

		// loop threw all the servers and check their version
		Debug(`Looping threw the servers (${Servers.length})`);
		for (let server of Servers)
		{
			let Server = server.split(":");
			await query
			.info(Server[0], parseInt(Server[1]), 1200)
			.then(async server => 
			{
				let version = server.version;

				if(!version) {
					Embed.addField(`\`${Server}\` :: ${Offline}`); // server is offline
					Err(`Server: ${Server} is offline!`);
				} else {
					let url = `http://api.steampowered.com/ISteamApps/UpToDateCheck/v0001/?appid=${appID}&version=${version}&format=json`;
					await fetch(url, { method: "Get" })
					.then(res => res.json())
					.then((json) => {
						Debug(`Updating the bot status with the recent version`);
						client.user.setActivity(`🔥 Loaded ${Servers.length} Servers | Ver: ${json.response.required_version}`, {type: "WATCHING"}).catch(console.error);
						if(json.response.up_to_date == true) {
							Embed.addField(`\`${Server[0]}:${Server[1]}\` :: ${UpToDate}`, '-', false); // server is up to date
							Debug(`Server: ${Server[0]}:${Server[1]} is up to date.`);
						}
						else {
							// server isn't up to date
							Embed.addField(`\`${Server[0]}:${Server[1]}\` :: ${NotUpToDate}`, '-', false);
							notUpdServers.push(`${Server[0]}:${Server[1]}`);
							Debug(`Server: ${Server[0]}:${Server[1]} is NOT up to date.`);
						}
					});
				}
			})
			.catch(console.log); // handle any query error
		}

		// check if there are un-updated servers AND the private message featured enabled
		if(notUpdServers.length > 0 && typeof PrivateMSG !== 'undefined' && !msgSent.has(AuthorUserID)) {
			Debug(`Sending the user the un-updated servers`);
			if(typeof PrivateMSG === 'undefined') return Err('You must specify your user id in order to get private messages!')
			const notUpdatedServers = new Discord.MessageEmbed()
			.setTitle(`New update available!`)
			.setColor('RED')
			.setTimestamp();

			let servers = '';
			for (let server of notUpdServers) { servers += `${server}\n`; }

			notUpdatedServers.setDescription(`Servers:\n${servers}\nNeed to be updated!`);
			client.users.cache.get(AuthorUserID).send(notUpdatedServers); // send the user message with the servers
			msgSent.add(AuthorUserID);

			setTimeout( () => {
				msgSent.delete(AuthorUserID);
			}, 60*2*60*1000); // 2 Hours (60(min) * 2(h) * 60(sec) * 1000 (ms))
		}

		// edit the last bot message with the current state
		await client.channels.cache.find(x => x.id === `${ChannelID}`).messages.fetch({ limit: 1 }).then(async messages => {
			let lastMessage = messages.first();
			
			Debug(`Editing the bot message with the recent data`);
			await lastMessage.edit(Embed);
		}).catch(console.error);
	} catch (e) {
		console.log(e);
	}
	Debug(`Setting timeout for ${Delay} seconds before refreshing the data`);
	Timeout = setTimeout(data, Delay*1000); // set timout with the specified delay to loop
}

function CreateEmbed() {
	const Blank = new Discord.MessageEmbed()
		.setDescription(`-`);
	client.channels.cache.find(x => x.id === `${ChannelID}`).send(Blank);
}

function Err(msg){
	if(typeof chalk !== 'undefined') console.log(chalk.red(`[ERROR] ${msg}`));
	else console.log(`[ERROR] ${msg}`);
}

function Debug(msg){
	if(debug_mode) if(typeof chalk !== 'undefined') console.log(chalk.blue(`[DEBUG] ${msg}`));
	if(debug_mode) if(typeof chalk === 'undefined') console.log(`[DEBUG] ${msg}`);
}
