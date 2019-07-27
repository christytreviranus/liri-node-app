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
const omdbKey = keys.omdb.api_key;

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



