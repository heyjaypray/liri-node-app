var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

var keys = require("./keys.js");

var arg_1 = process.argv[2];
var arg_2 = process.argv[3];


function getTweets() {

    var client = new Twitter({
		consumer_key: "pSVeyFaVhRUhX864evqgno8PW",
		consumer_secret: "wYXVJ6DPk6eir0mcuBLYKBa8QBAamMV2fkwZjA7Z5gIK6SgfXH",
		access_token_key: "953780510215438336-XRPhelKwlsdJAX1sRjO0MroIUW6yB67",
		access_token_secret: "cexxkKZKgj9yM6forGBKzbC8QORNWcurV4ZBnLGyBNyXB"
	});

    var params = {screen_name: 'GGGGGGGeeUnit'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            
            var length = 1;
            if (tweets.length > 20){
                length=20;
            }else{
                length=tweets.length;
            }

            for(var i=0; i < length; i++){
                console.log("Tweet # " + (i + 1) + "..Created at: " + tweets[i].created_at);
		   		console.log(tweets[i].text);
		   		
            }

        } else {
            console.log(error)
        }
    });
}

function getSong() {
    var spotify = new Spotify({
        id: "4488f7cdeafa48d78c518eb0267f61f5",
		secret: "1700962b608d4d18a1789e97f552434c"
        });

        spotify.search({ type: 'track', query: arg_2 }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }

            if (data.tracks.items.length > 0) {
                for (var i = 0; i < data.tracks.items.length; i++) {
                    console.log("#" + (i + 1));
                    console.log("Artist name: " + data.tracks.items[i].artists[0].name);
                    console.log("Song name: " + data.tracks.items[i].name);
                    console.log("Preview link: " + data.tracks.items[i].preview_url);
                    console.log("Album name: " + data.tracks.items[i].album.name);
                    console.log("----------------------------------");
                }
            } else {
                console.log("No such song available...");
            }

        });
}


function getMovie() {

	request("http://www.omdbapi.com/?t=" + arg_2 + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

		if (!error && response.statusCode === 200) {           
            console.log("Title: " + JSON.parse(body).Title)
            console.log("Year: " + JSON.parse(body).Year)        
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating)       
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)          
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)  
            console.log("Countries: " + JSON.parse(body).Country)    
            console.log("Languages: " + JSON.parse(body).Language)      
            console.log("Plot: " + JSON.parse(body).Plot)           
            console.log("Actors: " + JSON.parse(body).Actors) 
		}
    });
    
    if (!process.argv[3]) {
		arg_2 = 'Mr. Nobody';
	}
}

function readRandom() {
	
	fs.readFile('random.txt', 'utf8', function(err, data) {
		if (err) {
			return console.log("Error occured: " + err);
		}
		var dataArr = data.split(',');
		arg_1 = dataArr[0];
		arg_2 = dataArr[1];
        process.argv[3] = true; 
        
		run();
	})
}


function run(){
    if (arg_1 === "my-tweets"){
        getTweets();
    }
    if (arg_1 === "spotify-this-song"){
        getSong();
    }
    if (arg_1 === "movie-this"){
        getMovie();
    }
    if (arg_1 === "do-what-it-says"){
        readRandom();
    }
};

run();