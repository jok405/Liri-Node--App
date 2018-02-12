
// ==============  Liri.js | Composed by John Kim | Univeristy of Richmond  ============================= 


require('dotenv').config();                // Import Keys from .env
let keys = require('./keys.js');
let fs = require('fs');                    // Included File System module
let request = require('request');          // Request API request module
let Twitter = require('twitter');          // Twitter API client module
let Spotify = require('node-spotify-api'); // Spotify API client module
let inputString = '';

// ===================== | Link in API Keys for Spotify and Twitter | ===================================

let client = new Twitter(keys.twitter);
let spotify = new Spotify(keys.spotify);

let params = {
    screen_name: 'JYKim13767057',
    count: 20
};

// ======================   | Manage User Command Type | ================================================
let commandType = process.argv[2];

let commandString = "";                                // Manages user input with or without quotes
for(let i = 3; i < process.argv.length; i++)
  {  commandString += process.argv[i] + " ";
}

//  =============================  | External Logging | =================================================

let logIt = "node liri.js ";
                                                       // Loop through all of process.argv
for(let i = 2; i < process.argv.length; i++){
  logIt += process.argv[i] + " ";
}
logIt = logIt.substring(0, logIt.length - 1);          // remove the tail space
                                                       // Insert line break txt file
fs.appendFile("log.txt", logIt, function(error) {
  
  if(error){                                           // User notice of error in logging 
    console.log('External logging error: ' + error);
  }
});

// ===============================  | Argument Inputs  | =================================================

switch(commandType)
{
  case 'my-tweets':                                  // Twitter
    myTweets();
    break;

  case 'spotify-this-song':                          // Spotify
    callSpotify(commandString);
    break;

  case 'movie-this':                                  // IMBD
    movieRequest(commandString);
    break;

  case 'do-what-it-says':                             // Retrieves Argument from random.txt
    doWhatItSays();
    break;

  default:                                        

    console.log('Valid Input: "my-tweets", "spotify-this-song", "movie-this", or "do-what-it-says"');

    fs.appendFile('log.txt', function(error) {
      if(error){
        console.log('External logging error: ' + error);
      }
    });
}

// ================================= | Functions to Call APIs | =============================================

function myTweets(myTwitterName = 'JYKim13767057')
{
  client.get('statuses/user_timeline', params, function(error, tweets, response) 
  {
    if(error) throw error;                    // If no error, loop tweets up to 20
        
    let existingTweets = "";                   // Used to store tweets for log.txt
    for(let i = 0; i < tweets.length; i++)
    {
      let newTweet = "Tweet " + (i+1) + ": " + tweets[i].text;

      console.log(newTweet);              // Display to User (inside the loop for cosmetic appeal)
      console.log('');

      existingTweets += newTweet;
    }

    fs.appendFile("log.txt", existingTweets, function(error) 
    {
      if(error)
      {
        console.log('Response: ' + error);
      }
    });
  });
}
// ===============================  | Spotify Function | =====================================================
// Display Artist(s), Song Name, Album, and Spotify Preview Link
// Default to The Sign by Ace of Base  
function callSpotify () {
  if (inputString.length === 0) {
    inputString = "The Sign Ace of Base"
  }
    spotify.search({
    type: 'track',
    limit: 5,
    query: inputString },
    function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      for (i = 0; i < 5; i++) {
        console.log("Track Name: " + data.tracks.items[i].name);                    //Track name
        console.log("Album Name: " + data.tracks.items[i].album.name);              //Album name
        console.log("Artist Name: " + data.tracks.items[i].artists[0].name);        //Artist name
        console.log("Spotify Link: " + data.tracks.items[i].external_urls.spotify); //URL link
      }     
    })
};

// =================================== | IMDB Request Function | ===============================================

function movieRequest(userInput)
{
  console.log('');     
  let movieTitle;
  if(userInput == "")
  {
    movieTitle = "Mr.+Nobody";         // Default movie search
  }
  else{
    movieTitle = userInput.replace(/ /g, "+");
  }

  // =============================== | OMDB API URL request to the | =============================================

  let queryUrl = 'http://www.omdbapi.com/?apikey=trilogy&t=' + movieTitle +'&plot=full&tomatoes=true&r=json';

  request(queryUrl, function (error, response, body)                        // Node Package request
  {
    if (!error && response.statusCode == 200) 
    {
      let movie = JSON.parse(body);                // Convert a local object from JSON text

      console.log("Movie Title: "+ movie.Title);                            // Movie Title
      console.log("Movie Year: "+ movie.Year);                              // Movie Year
      console.log("IMDB Rating: "+ movie.imdbRating);                       // Movie IMDB Rating
      console.log("Rotten Tomatoes Rating: "+ movie.rottenTomatoesRating);  // Rotten Tomatoes Rating (Critic)
      console.log("Country: "+ movie.Country);                              // Country of production
      console.log("Language: "+ movie.Language);                            // Language of movie
      console.log("Movie Plot: "+ movie.Plot);                              // Plot of movie
      console.log("Actors: "+ movie.Actors);                                // Actors in movie

      fs.appendFile("log.txt", function(error)                              // External log.txt
      {
        if(error)
        {
          console.log('External logging error: ' + error);
        }
      });
    }
    else
    {
      console.log('Error occurred: ' + error);
    }
  });
}
// =============================== | Do What It Says Function | ====================================================
function doWhatItSays()
{
  fs.readFile("random.txt", "utf8", function(error, data)                    // Readfile
  {
    // Split the text into a command type and input
    let dataArray = data.split(",")
    let randomType = dataArray[0];
    let randomString = dataArray[1];

    console.log('');
    let randomCall = 'Running Command: ' + randomType + ' ' + randomString;
    console.log(randomCall);

    fs.appendFile("log.txt", randomCall, function(error) 
    {
      if(error){
        console.log('External logging error: ' + error);
      }
    });
  });
}