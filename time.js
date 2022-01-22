const fs = require("fs");
const https = require('https');

//getTime()

function getTime() {
    APICall();
}

function APICall() {
    var time = '';
    const req = https.request('https://timeapi.io/api/Time/current/zone?timeZone=America/Chicago', res => {

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

        if (hour > 12) {
            hour = hour - 12;
            timeOfDay = "PM"
        }

        if (minute < 10) {
            minute = '0' + minute;
        }

        time = hour + ':' + minute + timeOfDay + ' ' + timeZone;

        var file = fs.createWriteStream("example.txt");
        file.write(time);
        })
    })

    req.on('error', error => {
        console.error(error)
    })

    req.end();

    readTime();

}

function readTime() {
    fs.readFile('example.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        printTime(data);
    })

}

var currentTime;

function printTime(dataTime) {
    this.currentTime = dataTime
    console.log("The time is: " + this.currentTime)
}

module.exports = { getTime, currentTime }
