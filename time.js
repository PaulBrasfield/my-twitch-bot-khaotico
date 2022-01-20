var currentTime;

function getTime() {
    const https = require('https');
    const req = https.request('https://timeapi.io/api/Time/current/zone?timeZone=America/Chicago', res => {
    
        res.on('data', d => {
        var x = JSON.parse(d);
        var hour = JSON.stringify(x.hour);
        var minute = JSON.stringify(x.minute);
        var timeOfDay = "AM";
        var timeZone = "CST"

        //var currentTime;

        if (hour > 12) {
            hour = hour - 12;
            timeOfDay = "PM"
        }

        console.log(hour + ':' + minute + timeOfDay + ' ' + timeZone)

        currentTime = hour + ':' + minute + timeOfDay + ' ' + timeZone;

        })
    })
    
    req.on('error', error => {
        console.error(error)
    })
    
    req.end()
}

module.exports = { getTime };