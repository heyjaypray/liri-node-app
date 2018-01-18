var twitterKeys = new Twitter({
  consumer_key: 'pSVeyFaVhRUhX864evqgno8PW',
  consumer_secret: 'wYXVJ6DPk6eir0mcuBLYKBa8QBAamMV2fkwZjA7Z5gIK6SgfXH',
  access_token_key: '953780510215438336-XRPhelKwlsdJAX1sRjO0MroIUW6yB67',
  access_token_secret: 'cexxkKZKgj9yM6forGBKzbC8QORNWcurV4ZBnLGyBNyXB'
});

var spotifyKeys = new Spotify({
    id: '4488f7cdeafa48d78c518eb0267f61f5',
    secret: '1700962b608d4d18a1789e97f552434c'
  });

module.exports = {
    twitterKeys:twitterKeys,
    spotifyKeys:spotifyKeys
}
