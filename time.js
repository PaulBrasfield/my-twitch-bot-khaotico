const https = require('https');

var currentTime;

//getTime();

function getTime() {
    const req = https.request('https://timeapi.io/api/Time/current/zone?timeZone=America/Chicago', res => {

        var time = '';

        var hour = '';
        var minute = '';
        var timeOfDay = 'AM';
        var timeZone = 'CST';

        res.on('data', d => { 
        var x = JSON.parse(d);
        hour = JSON.stringify(x.hour);
        minute = JSON.stringify(x.minute);
        timeOfDay = "AM";
        timeZone = "CST"

        //console.log(this.hour);

        if (hour > 12) {
            hour = hour - 12;
            timeOfDay = "PM"
        }

        if (minute < 10) {
            minute = '0' + minute;
        }

        time = hour + ':' + minute + timeOfDay + ' ' + timeZone;

        //currentTime = this.time;

        //console.log(time);

        printTime(time);

        return time;

        })
    })

    req.on('error', error => {
        console.error(error)
    })


    req.end()

    
}

function getCurrentTime() {
    return currentTime;
}

function printTime(x) {
    currentTime = x;
    console.log(currentTime);
}

module.exports = { getTime, getCurrentTime, currentTime }
