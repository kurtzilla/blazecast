  var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var sass = require('node-sass-middleware');
var favicon = require('serve-favicon');

// Load environment variables from .env file
dotenv.load();

// Models
var User = require('./models/User');

// Controllers
var userController = require('./controllers/user');
var contactController = require('./controllers/contact');
var apiController = require('./controllers/api');
var resourceController = require('./controllers/resource');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(favicon(path.join(__dirname, './public/images', 'favicon.ico')));
app.use(compression());
app.use(sass({ src: path.join(__dirname, 'public'), dest: path.join(__dirname, 'public') }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    new User({ id: payload.sub })
      .fetch()
      .then(function(user) {
        req.user = user;
        next();
      });
  } else {
    next();
  }
});

app.post('/contact',
  contactController.contactPost);
app.put('/account',
  userController.ensureAuthenticated,
  userController.accountPut);
app.delete('/account',
  userController.ensureAuthenticated,
  userController.accountDelete);
app.post('/signup',
  userController.signupPost);
app.post('/login',
  userController.loginPost);
app.post('/forgot',
  userController.forgotPost);
app.post('/reset/:token',
  userController.resetPost);
app.get('/unlink/:provider',
  userController.ensureAuthenticated,
  userController.unlink);
app.post('/auth/facebook',
  userController.authFacebook);
app.get('/auth/facebook/callback',
  userController.authFacebookCallback);
app.post('/auth/google',
  userController.authGoogle);
app.get('/auth/google/callback',
  userController.authGoogleCallback);
app.post('/auth/twitter',
  userController.authTwitter);
app.get('/auth/twitter/callback',
  userController.authTwitterCallback);
app.get('/itunesdummydata',
  apiController.serveiTunesDummy);

// post to this route to follow this podcast for a user
app.post('/api/users/:user_id/follow/:podcast_id',
  apiController.followPodcast);
app.post('/api/users/:user_id/unfollow/:podcast_id',
  apiController.unfollowPodcast);

app.get('/api/users/:user_id/follow',
  apiController.getFollows);
app.get('/api/podcasts/:podcast_id/follow',
  apiController.getEpisodes);
app.get('/api/testApi',
  apiController.testApi);
app.get('/api/podcasts/:itunes_podcast_id/episodes',
  apiController.getFedPodcastEpisodes);


app.get('/proxyresource/:resourceurl',
  resourceController.proxyResource);


app.post('/api/users/:user_id/save/:provider_id/:itunes_episode_id',
  apiController.saveEpisode);

app.post('/api/users/:user_id/favorite/:provider_id/:itunes_episode_id',
  apiController.favoriteEpisode);

app.get('/api/users/:user_id/savedPodcasts',
  apiController.getSavedEpisodes);

app.get('/api/users/:user_id/favoriteEpisodes',
  apiController.getFavoriteEpisodes);

app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
