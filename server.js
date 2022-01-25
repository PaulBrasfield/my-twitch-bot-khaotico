
/*-------------------------- ANCIENT EGG BOT --------------------------
    |  AUTHOR: Paul Brasfield
    |
    |  CREATED:  Jan 24, 2022
    |
    |  (c) Copyright by Khaotico
/*-------------------------------------------------------------------*/

require('dotenv').config(); //Environment file to store sensitive data

const tmi = require('tmi.js'); //Library to communicate with Twitch API

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/); //Regular Expression for command usage

const VERSION = 'v1.0.0'; //Current version of the bot

var currentTime; //The current system time

//List of commands
const commands = {

    //General Commands
    schedule: {
        response: 'Mondays, Wednesdays, and Fridays from 8pm CST to 12am-1am CST'
    },
    time: {
        response: `Current time for Khaotico: ${currentTime}`
    },

    //Spam Commands
    refund: {
        response: (user) => `${user} Your channel points PepeLaugh :point_right: :chart_with_downwards_trend:`
    },
    xboxblowout: {
        response: 'By the rivers of Babylon, there we sat down, yea, we wept, when we remembered Zion. ' + 
        'Remember, O Lord, The Children of Edom in the day of Jerusalem who said, "Raze it, raze it, ' + 
        'even to the foundation." O daughter of Babylon, who art to be destroyed. ' + 
        'How happy shall he be, that rew https://twitter.com/pauljac3_/status/984445523326263296?s=20'
    },

    //Game Commands

        //Animal Crossing New Horizons
        villagers: {
            response: 'Current Villagers in Aria: Annabelle, Cranston, Doc, Dom, Ed, Eugene, Marina, Piper, Tad'
        },
   

    //Social Commands
    friendcode: {
        response: 'Switch Friend Code: SW-3714-0961-8601'
    },
    discord: {
        response: 'Join Khaotico\'s Discord Server! https://discord.gg/WSaeZEcX7J'
    },
    twitter: {
        response: 'https://twitter.com/KhaoticoTTV/'
    },
    youtube: {
        response: 'https://www.youtube.com/channel/UC803hb0MzuN1Mz1W6_iUu-w'
    },

    //Debugging Commands
    ping: {
        response: (user) => `Hello ${user}, I am active!`
    },
    version: {
        response: `I am in version ${VERSION}`
    }
}

//Create a new Client object from TMI
const client = new tmi.Client({
    connection: {
      reconnect: true
    },
    channels: [
      'khaotico'
    ],
    identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_OAUTH_TOKEN
    }
  });


//Connect to the channel
client.connect();

//Print messages if we successfully connected
client.on('connected', () => {
    console.log(`Ancient Egg Bot ${VERSION}`)
    console.log("-----------------------")
    console.log("\nConnected to the channel successfully!")
    
    getTime();

    console.log("-----------------------")

    setInterval(getTime, 60000);
})

//Run commands based on messages received
client.on('message', (channel, tags, message, self) => {
    
    const isNotBot = tags.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME.toLowerCase();

    if ( !isNotBot ) {
        return;
    }

    const [raw, command, argument] = message.match(regexpCommand);

    const { response } = commands[command] || {};

    if ( typeof response === 'function' ) {
    client.say(channel, response(tags.username))
    } else if ( typeof response === 'string' ) {
    client.say(channel, response);
    } else {
        client.say(channel, 'yes')
      }

	console.log(`${tags['display-name']}: ${message}`);
});

//Get current time and format according to 12-hour convention
function getTime() {
    let date = new Date();

    currentTime = date.toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour: '2-digit', minute:'2-digit'}) + " CST"
    
    commands.time.response = `Current time for Khaotico: ${currentTime}`
 
    console.log("\nThe time is: " + currentTime + "\n")
    
}
