# LIRI - Command Line Assistant
Acronym for Language Interpretation and Recognition Interface. It is a command line node app that collects parameters and retrieves data from IMDB, Twitter, and Spotify APIs.

Node.js is the composing language requiring dependencies for the request, spotify, and twitter node packages. Additionally, it also requires the fs package to read and write into text files.

The app features 4 different features using the node liri.js [command-here] syntax comprised below:

1. My-tweets returns 20 most recent tweets using the Twitter API.
2. Spotify-this-song [song-title-here] returns the artist, album, and preview URL for a song using the Spotify API.
3. Movie-this [movie-title-here] returns the year, rating, plot summary, reviews of a movie using the IMDb API.
4. Do-what-it-says returns the result of a "random" result by reading the random.txt file and performing the command written in that file. This command can be changed to any one of the 3 types listed above.

Instructions
Unfortunately, since this is a command line application, it must be cloned down to your machine for proper demo. Cloning the repository and execute npm install for required node dependencies mentioned above.

Once the node packages are installed...

Acquire API keys for Twitter. Please refer to the Twitter Apps page to get a consumer_key, consumer_secret, access_token_key, and access_token_secret. You can also see the npm page for additional information.
After you get the API keys, open the keys.js file and paste them into the correpsonding locations in the exports.twitterKeys object.
Finally, you can open the liri.js file and change the variable to your twitter handle.
Note that the Spotify API and IMDb do not need special keys, so you can run the app with minimal setup if you wish to skip over the Twitter API functionality.
To run the app, simply use the node liri.js [command-here] format discussed above. Please refer to the screenshots for specific examples. Be sure that you cd into the liri-node-app folder before running the commands.

# Screenshots
Twitter API
Running the command node liri.js my-tweets will return my 20 most recent tweets. 
Twitter Command
![Twitter Command](/screenshots/twitter.png)

Note that I have only tweeted 3 times, thus 3 tweets are shown.

Spotify API
Running the command node liri.js spotify-this-song will return the track info. 
Spotify Command
![Spotify Command](/screenshots/Spotify.png)

IMDb API
Running the command node liri.js movie-this "Casino Royale" will return the movie info. 
IMDb Command
![IMDb Command](/screenshots/omdb.png) 

Note that running node liri.js spotify-this-song "Casino Royale" will produce the same result.
Node fs file reader
Running the command node liri.js do-what-it-says will read a command out of the random.txt file and perform it. 
Random Command
![Random Command](/screenshots/Do_what_it_says.png)

Note that in this case, the log.txt file contains the command to Spotify the song "I Want It That Way". The log.txt file can be changed to perform any of the 3 types of commands listed above.

Error Handling
If the LIRI inputs are incomplete, the user will be prompted with a list of possible commands. 
Missing or Invalid Command
![Missing Command](/screenshots/error.png)
