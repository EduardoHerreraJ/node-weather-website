const request = require('request')

const forecast = (longitud, latitud,callback) =>{
    
    const url = 'http://api.weatherstack.com/current?access_key=e5fbaf23890d0931c65b2739976d1a5e&query='+ encodeURIComponent(latitud) +','+ encodeURIComponent(longitud) +'units=m'
    
    request({url,json : true}, (error, {body}={}) => {
        
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined,
                 body.current.weather_descriptions[0]+'it is ' + body.current.temperature+ ' degress out, but it feels like '+body.current.feelslike+ ' degrees' ,
            )
        }

        
    })

}
module.exports = forecast