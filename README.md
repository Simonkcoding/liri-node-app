# liri-node-app

# 1. Overall view

This is a _Language_ Interpretation and Recognition node app that takes in parameters and gives you back data. With it, you can search for:

1. song based on keywords
2. concert with artist names
3. movie using movie names

Plus, programming to do these 3 search, as well as a logging function.

*This program requires the following modules to work:

  * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Request](https://www.npmjs.com/package/request)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)

** Spotify requires a client ID and secret to run. It is easy to set up and account here:

[Spotify-API](https://developer.spotify.com/dashboard/login)

and put the keys in .env file:

![alt text](/img/envkey.png)

# 2. How it works?

1. search for song:

![alt text](/img/spotify.png)

Example: "node liri.js spotify-this-song happy". 

Liri uses the 3rd argument as input of the search key.

2. search for concert:

![alt text](/img/concert.png)

Example: "node liri.js concert-this lil xan". 

3. search for movie-this:

![alt text](/img/movie.png)

Example "node liri.js movie-this star wars".

4. Programmed search

![alt text](/img/dothis4me.png)

To do this, change the first argument in the random.txt to command 'spotify-this-song/concert-this/movie-this'

In the 2nd argument, following with no space after "," type in the search content - ![#1589F0](highlighted blue)`#1589F0`

5. data log

![alt text](/img/logtxt.png)

Liri allows logging to log.txt for recording search history.

# 3. APIs
concert-this:
[bandsintown](http://www.artists.bandsintown.com/bandsintown-api)
[OMDB](http://www.omdbapi.com/)