const request = require('request')

const forecast = (longitude, latitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/8959d44418d08de6a6da8c864daefdfa/' + latitude + ',' + longitude

    request({ url, json: true },(error, { body }) =>{
        if (error){
            callback('Unable to connect to weather service',undefined)

        } else if (body.error){
            callback('Unable to find location.',undefined)

        }else{
            callback(undefined,{
                    summary: body.daily.data[0].summary,
                    currentTemp: body.currently.temperature,
                    particProbability: body.currently.precipProbability + '%',
                    fullSummary: body.daily.data[0].summary + ' ' + 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.'
             })
        }
    })
}

module.exports = forecast