require('dotenv').config();

const tmi = require('tmi.js');

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

let date = new Date();

const timeInfo = {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    timeOfDay: 'AM',
    timeZone: 'CST',
}

checkTime(timeInfo.hours, timeInfo.minutes);

var currentTime = timeInfo.hours + ":" + timeInfo.minutes + timeInfo.timeOfDay + ' ' + timeInfo.timeZone;

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
    }
}


const client = new tmi.Client({
    connection: {
      reconnect: true
    },
    channels: [
      'khaotico'
    ],
    identity: {
        username: 'AncientEggBot',
        password: 'oauth:ff44sv55vru2v2io78g941hkhi7358'
    }
  });

client.connect();


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

	// "Alca: Hello, World!"
	console.log(`${tags['display-name']}: ${message}`);
});

function checkTime(timeHours, timeMinutes) {
    if (timeHours > 12) {
        timeHours = timeHours - 12
        timeInfo.timeOfDay = 'PM'
    }
    
    if (timeMinutes < 10) {
        timeMinutes = '0' + timeMinutes;
    }

    timeInfo.hours = timeHours;
    timeInfo.minutes = timeMinutes;

    return timeHours, timeMinutes
}

console.log(currentTime);
		