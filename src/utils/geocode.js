const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibmVlcmFqbmFuZCIsImEiOiJjazJteHU1M20wMDRjM2Rudjh2M3hpNnA2In0.qmeVNU7MfvAV2bi_nwrPUA'
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback("Can't connect to mapbox.com! Please check your connection", undefined)
        }
        else if(body.features.length === 0){
            callback("Can't find the location!", undefined)
        }
        else{
        callback(undefined, {latitude: body.features[0].center[1],
                                longitude: body.features[0].center[0],
                                place: body.features[0].place_name
        })
        }
    })
    }

    module.exports = geocode