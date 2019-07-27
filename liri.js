//Read and set environment variables with the dotenv package
require("dotenv").config();

// Require file system
const fs = require("fs");

//Import 'keys.js'
const keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);

//Require the node package manager for Spotify, request and moment
const Spotify = require('node-spotify-api');
const request = require('request');
const moment = require('moment');

//OMDB key
const omdbKey = trilogy; //keys.omdb.api_key;

//Grab user input command and requested search criteria
const command = process.argv[2];
const secondCommand = process.argv[3];

//Create switches for command data to run selected search functions
switch (command) {
    case ('concert-this'):
        concertThis();
        break;

    case ('spotify-this-song'):
        if (secondCommand) {
            spotifyThisSong(secondCommand);
        } else {
            spotifyThisSong("Enjoy the Silence");
        }
        break;

    case ('movie-this'):
        if (secondCommand) {
            movieThis(secondCommand);
        } else {
            movieThis("Requiem for a Dream");
        }
        break;

    case ('do-what-it-says'):
        doWhatSays();
        break;

    default:
        console.log('Sorry, Please try again...');
};

//Concert This function
function concertThis() {
    bandsintown.getArtistEventList(secondCommand).then(function (events) {
        console.log(`
    ${'Band: ' + secondCommand}
    ${'Venue Name: ' + events[0].venue.name}
    ${'Location: ' + events[1].formatted_location}
    ${'Date: ' + moment(events[0].datetime).format('L')}`);
        fs.appendFile('log.txt', `
${secondCommand}
Venue Name: ${events[0].venue.name}
Location: ${events[1].formatted_location}
Date: ${moment(events[0].datetime).format('L')}
`,
            function (err) {
                if (err) throw err;
                console.log('Saved to log.txt!');
            });
    });
};
//Spotify Song Function
function spotifyThisSong(song) {
    spotify.search({ type: 'track', query: song, limit: 1 }, function (error, data) {
        if (!error) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = data.tracks.items[i];
                //artist
                console.log("Artist: " + songData.artists[0].name);
                //song name
                console.log("Song: " + songData.name);
                //spotify preview link
                console.log("Preview URL: " + songData.preview_url);
                //album name
                console.log("Album: " + songData.album.name);
                console.log("-----------------------");
            }
        } else {
            console.log('Error occurred.');
        }
    });
}
//OMDB Movie Function
function movieThis(movie) {
    var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&apikey=' + omdbKey + '&plot=short&tomatoes=true';

    request(omdbURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);

            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            console.log("Rotten Tomatoes URL: " + body.tomatoURL);

        } else {
            console.log('Error occurred.')
        }
        if (movie === "Mr. Nobody") {
            console.log("-----------------------");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");

        }
    });

}
//Random Function
function doWhatSays() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        var txt = data.split(',');

        spotifyThisSong(txt[1]);
    });
}


