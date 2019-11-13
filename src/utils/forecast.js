const request = require('request')

const forecast = (longitude, latitude, callback) => {

const url ='https://api.darksky.net/forecast/51c469fa8174af2ada4a4769b3d90ae4/' + latitude + ',' + longitude + '?units=si'

request({url, json:true}, (error, {body}) => {
    if(error){
        callback("Can't reach darksky.net! Please check your connection")
    }else if(body.error){
        callback("Can't find the location. Try again!")
    }else{
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. The high today is ' + body.daily.data[0].temperatureHigh +' degrees with a low of ' + body.daily.data[0].temperatureLow + ' degrees. There is ' + body.currently.precipProbability + '% chance of rain')
    }

} )

}

module.exports = forecast