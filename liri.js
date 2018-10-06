
var dotenvConfig = require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var request = require('request');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);
var media = process.argv.slice(3).join(" ");


//1. `node liri.js spotify-this-song '<song name here>'`
if (process.argv[2] == "spotify-this-song") {
    spotifyThisSong();
}

function spotifyThisSong(){
    console.log(media);
    spotify
        .search({ type: 'track', query: media })
        .then(function (response) {
            var items = response.tracks.items
            for (var set in items) {
                console.log("------------------")
                console.log(set)
                console.log("Song by: " + items[set].artists[0].name);
                console.log("Song Name: " + items[set].name);
                console.log("Preview_url: " + items[set].preview_url);
                console.log("Album: " + items[set].album.name);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}


//2. `node liri.js concert-this <artist/band name here>`
if (process.argv[2] == "concert-this") {
    concertThis();
}

function concertThis(){
    console.log(media)
    var urlquery = "https://rest.bandsintown.com/artists/" + media + "/events?app_id=codingbootcamp";

    request(urlquery, function (error, response, body) {
        // Print the error if one occurred
        console.log('error:', error);
        console.log("Upcoming concerts for " + media + ":")
        var obj = JSON.parse(body);
        for (var set in obj) {
            var date = moment(obj[set].datetime).format("YYYY/MM/DD");
            console.log("At " + obj[set].venue.name + " " + obj[set].venue.city + " " + date);
        }
    })
}

//3. `node liri.js movie-this '<movie name here>'`
if (process.argv[2] == "movie-this") {
    movieThis();
}

function movieThis(){
    console.log(media)
    var queryUrl = "http://www.omdbapi.com/?t=" + media + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            //Title: The Matrix
            //Year: 1999
            //Rated: R
            //IMDB Rating: 8.7
            //Country: USA
            //Language: English
            //Plot: Thomas A. Anderson is a man living two lives. By day he is an average computer programmer and by night a hacker known as Neo. Neo has always questioned his reality, but the truth is far beyond his imagination. Neo finds himself targeted by the police when he is contacted by Morpheus, a legendary computer hacker branded a terrorist by the government. Morpheus awakens Neo to the real world, a ravaged wasteland where most of humanity have been captured by a race of machines that live off of the humans' body heat and electrochemical energy and who imprison their minds within an artificial reality known as the Matrix. As a rebel against the machines, Neo must return to the Matrix and confront the agents: super-powerful computer programs devoted to snuffing out Neo and the entire human rebellion.
            //Actors: Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving
            //Rotten Tomatoes Rating: 87%
            var movie = JSON.parse(body);
            console.log("Title: " + movie.Title);
            console.log("Year: " + movie.Year);
            console.log("Rated: " + movie.Rated);
            console.log("IMDB Rating: " + movie.imdbRating);
            console.log("Country: " + movie.Country);
            console.log("Language: " + movie.Language);
            console.log("Plot: " + movie.Plot);
            console.log("Actors: " + movie.Actors);
            console.log(movie.Ratings[1].Source+":"+movie.Ratings[1].Value);
        }
    });
}

//4. `node liri.js do-what-it-says`
var fs = require("fs");
fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
  
    var dataArr = data.split(",");
  
    console.log(dataArr);
  
    media = dataArr[1];
    
if (dataArr[0]=="spotify-this-song"){
    
    spotifyThisSong();
} else if (dataArr[0]=="concert-this"){
  
    concertThis();
} else if (dataArr[0]=="movie-this"){
    
    movieThis();
} else {
    console.log("Please put 'spotify-this-song/concert-this/movie-this' in the first entry!")
}
  });
  