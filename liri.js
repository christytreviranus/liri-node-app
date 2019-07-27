//Read and set environment variables with the dotenv package
require("dotenv").config();

//Import 'keys.js'
const keys = require("./keys.js");

//Require the node package manager for Spotify, request and moment
const Spotify = require('node-spotify-api');
const moment = require('moment');
const axios = require('axios');
const fs = require("fs");

//Spotify key
let spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret,
  });

//Grab user input command and requested search criteria
const command = process.argv[2];
const value = process.argv.slice(3).join(" ");

//Create switches for command data to run selected search functions
switch (command) {
    case "concert-this":
      concertThis(value)
      break;
    case "spotify-this-song":
      getMySong(value)
      break;
    case "movie-this":
      movieThis(value)
      break;
    case "do-what-it-says":
      doWhatItSays()
      break;
    default:
      break;
  }

//Create function for Concert Search
function concertThis(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
      .then(function (response, err) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        let venue = response.data[0].venue.name;
        let venueLocation = response.data[0].venue.name;
        console.log("Name of the venue:", venue);
        console.log("Venue location:", venueLocation);
        let eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
        console.log("Date of the Event:", eventDate);
        //Append data to log.txt
        fs.appendFileSync("log.txt", "Artist: " + artist + "\nVenue Name: " + venue + "\nVenue Location: " + venueLocation + "\nEvent Date: " + eventDate + "\n----------------\n", function (error) {
          if (error) {
              console.log(error);
          } 
      });
  });
}

//Create function for Song Search
function getMySong(songName) {  
    //If user has not specified a song , default to "The Sign" by Ace of Bass
    if (!songName) {
      songName = "I Saw the Sign";
    }
    spotify.search({ type: 'track', query: songName }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      //Artist(s)
      let artist = data.tracks.items[0].album.artists[0].name;
      console.log("Artist(s): ", artist)
      //Song Name
      console.log("Song Name: ", data.tracks.items[0].name)
      // A preview link of the song from Spotify
      let preview_url = data.tracks.items[0].preview_url
      console.log("Preview Link: ", preview_url)
      // The album that the song is from
      let albumName = data.tracks.items[0].album.name
      console.log("Album Name: ", albumName)
      //Append data to log.txt
      fs.appendFileSync("log.txt", "Artist: " + artist + "\nSong Name: " + songName + "\nPreview Link: " + preview_url + "\nAlbum Name: " + albumName + "\n----------------\n", function (error) {
        if (error) {
            console.log(error);
        } 
    });
    });
  }

//Create function for Movie Search
function movieThis(movieName) {
    //If user has not specified a movie, default to "Mr. Nobody"
    if (!movieName) {
     movieName = "Mr. Nobody";
   }
   axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movieName)
     .then(function (data) {
       let results = `
       Title of the movie: ${data.data.Title}
       Year the movie came out: ${data.data.Year}
       IMDB Rating of the movie: ${data.data.Rated}
       Rotten Tomatoes Rating of the movie: ${data.data.Ratings[1].Value}
       Country where the movie was produced: ${data.data.Country}
       Language of the movie: ${data.data.Language}
       Plot of the movie: ${data.data.Plot}
       Actors in the movie: ${data.data.Actors}`;
       console.log(results)
      //Append data to log.txt
      fs.appendFileSync("log.txt", results + "\n----------------\n", function (error) {
        if (error) {
            console.log(error);
        } 
    });
    })
    .catch(function (error) {
      console.log(error);
    });
    //If Mr. Nobody is typed or movieName empty, do the following:
    if (movieName === "Mr. Nobody") {
        console.log("-----------------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    };
  }
//Create function for Random.txt
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
      data = data.split(",");
      let action = data[0]
      let value = data[1]
      switch (action) {
        case "concert-this":
          concertThis(value)
          break;
        case "spotify-this-song":
          getMySong(value)
          break;
      }
      //Append data to log.txt
      fs.appendFileSync("log.txt", value + "\n----------------\n", function (error) {
        if (error) {
            console.log(error);
        } 
    });
    });
  }