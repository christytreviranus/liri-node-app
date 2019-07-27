# liri-node-app

* Language Interpretation and Recognition Interface app using Node.js
* LIRI will be a command line node app that takes in parameters and gives you back data.

## LIRI uses the following commands:
```
concert-this
```
```
spotify-this-song
```
```
movie-this
```
```
do-what-it-says
```

## Technologies used:

* Node.js
* Javascript

## npm packages: 

  * [Node-Spotify-API] (https://www.npmjs.com/package/node-spotify-api)
  * [Axios] (https://www.npmjs.com/package/axios)
  * [Moment] (https://www.npmjs.com/package/moment)
  * [DotEnv] (https://www.npmjs.com/package/dotenv)

## APIs

* [BandsInTown](https://rest.bandsintown.com/)
* [OMDB](https://www.omdbapi.com/)
* [Spotify](https://www.npmjs.com/package/node-spotify-api) 

## How to Run LIRI-Bot

* Command #1:  `node liri.js concert-this <artist/band name here>`
 
    This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

        * Name of the venue
        * Venue location
        * Date of the Event (use moment to format this as "MM/DD/YYYY")


* Command #2:  `node liri.js spotify-this-song '<song name here>'`
	
	This will show the following information about the song in your terminal/bash window: 

        * Artist(s) 
        * The song's name 
        * A preview link of the song from Spotify 
        * The album that the song is from
        * If no song is provided then the program will default to "The Sign" by Ace of Base.


* Command #3: `node liri.js movie-this '<movie name here>'`
	
	This will output the following information to your terminal/bash window:

	   * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
       * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody'

* Command #4: `node liri.js do-what-it-says`

	This will output the command placed in random.txt file
    
        * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
        * Edit the text in random.txt to test out the feature for movie-this and concert-this.



