require("dotenv").config();
const keys = require('./keys.js')
let request = require('request')
let Twitter = require('twitter')
let Spotify = require('node-spotify-api')
let fs = require('fs')
const queryString = require('query-string')
let [nope, moar_nope, ...args] = process.argv
let client = new Twitter(keys.twitter)
let spotify = new Spotify(keys.spotify)

const fileParam = () => {
    var array2 = []
    let data = fs.readFileSync('./random.txt','utf8') 
        var array = data.trim().split(',')
        for (let i = 0; i < array.length; i++) {
            array2.push(array[i])  
        }
    return array2;
}
var parameters = fileParam()
var command = parameters[0]
var query = parameters[1]

const commands = (param, param2 = 0) => {
    if (param === "my-tweets") {
        var params = {screen_name: 'anthony11544'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for (let i = 0; i < tweets.length; i++) {
                    console.log(tweets[i].text)    
                }
            }
        })
    }
    if (param === 'spotify-this-song') {
        if (param2 === 0) {
            param2 = 'The Sign'
            spotify.search({ type: 'track', query: param2 }, function(err, data) {
                console.log(data.tracks.items[5].artists[0].name)
                console.log(data.tracks.items[5].name)
                console.log(data.tracks.items[5].external_urls.spotify)
                console.log(data.tracks.items[5].album.name)  
            })    
        }
        else {
            spotify.search({ type: 'track', query: param2 }, function(err, data) {
                for (let i = 0; i < 1; i++) {
                    console.log(data.tracks.items[i].artists[0].name)
                    console.log(data.tracks.items[i].name)
                    console.log(data.tracks.items[i].external_urls.spotify)
                    console.log(data.tracks.items[i].album.name)   
                }
            })
        }   
    }
    if (param === 'movie-this') {
        if (param2 === 0) {
            param2 = 'Mr.Nobody'
            request('http://www.omdbapi.com/?t=' + param2 + "&y=&plot=short&apikey=trilogy&r=json", function (error, response, body) {
                if (error) {return console.log('Error occurred: ' + err);}
                else {
                    object = JSON.parse(body)
                    console.log(object.Title)
                    console.log(object.Year)                   
                    console.log(object.imdbRating)
                    console.log(object.Ratings[1].Value)
                    console.log(object.Country)
                    console.log(object.Language)
                    console.log(object.Plot)
                    console.log(object.Actors)
                }
            })
        }
        else {
            request('http://www.omdbapi.com/?t=' + param2 + "&y=&plot=short&apikey=trilogy&r=json", function (error, response, body) {
                if (error) {return console.log('Error occurred: ' + err);}
                else {
                    object = JSON.parse(body)
                    console.log(object.Title)
                    console.log(object.Year)                   
                    console.log(object.imdbRating)
                    console.log(object.Ratings[1].Value)
                    console.log(object.Country)
                    console.log(object.Language)
                    console.log(object.Plot)
                    console.log(object.Actors)
                }
        })    
        }
    }
}

const random = (param, param2 = 0) => {
    if (param === 'do-what-it-says') {
        commands(command,query);
    }
    else {
        commands(param, param2);
    }
}

random(args[0],args[1])
