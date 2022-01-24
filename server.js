require('dotenv').config();

const tmi = require('tmi.js');

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

var currentTime; // = date.toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour: '2-digit', minute:'2-digit'}) + " CST"

const commands = {
    twitter: {
        response: 'https://twitter.com/KhaoticoTTV/'
    },
    youtube: {
        response: 'https://www.youtube.com/channel/UC803hb0MzuN1Mz1W6_iUu-w'
    },
    friendcode: {
        response: 'Switch Friend Code: SW-3714-0961-8601'
    },
    refund: {
        response: (user) => `${user} Your channel points PepeLaugh :point_right: :chart_with_downwards_trend:`
    },
    schedule: {
        response: 'Mondays, Wednesdays, and Fridays from 8pm CST to 12am-1am CST'
    },
    believers: {
        response: 'BELIEVERS :clown_face:'
    },
    doubters: {
        response: 'DOUBTERS :clown_face:'
    },
    time: {
        response: `Current time for Khaotico: ${currentTime}`
    },
    villagers: {
        response: 'Current Villagers in Aria: Annabelle, Cranston, Doc, Dom, Ed, Eugene, Marina, Piper, Tad'
    },
    xboxblowout: {
        response: 'By the rivers of Babylon, there we sat down, yea, we wept, when we remembered Zion. ' + 
        'Remember, O Lord, The Children of Edom in the day of Jerusalem who said, "Raze it, raze it, ' + 
        'even to the foundation." O daughter of Babylon, who art to be destroyed. ' + 
        'How happy shall he be, that rew https://twitter.com/pauljac3_/status/984445523326263296?s=20'
    }
}

getTime();

setInterval(getTime, 60000);


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

client.connect();

client.on('connected', () => {
    console.log("Connected to the channel successfully!")
})


client.on('message', (channel, tags, message, self) => {
    
    const isNotBot = tags.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME.toLowerCase();

      if ( !isNotBot ) return;

      const [raw, command, argument] = message.match(regexpCommand);

      const { response } = commands[command] || {};

      if ( typeof response === 'function' ) {
        client.say(channel, response(tags.username))
      } else if ( typeof response === 'string' ) {
          client.say(channel, response);
      }

	console.log(`${tags['display-name']}: ${message}`);
});

function getTime() {
    let date = new Date();

    currentTime = date.toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour: '2-digit', minute:'2-digit'}) + " CST"
    

    commands.time.response = `Current time for Khaotico: ${currentTime}`

    console.log("The time is: " + currentTime)
    
}
