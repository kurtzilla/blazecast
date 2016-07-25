
// var dotenv = require('dotenv');
// var jwt = require('jsonwebtoken');
var https = require('https');

// Load environment variables from .env file
// dotenv.load();

var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Print the google web page.
//   }
// })


exports.getPodcast = function(req, res, next){
  var provider_id = req.params.id;
  console.log('prov id', provider_id);

  //return Promise.resolve('pinged api func');

  // TODO ping database for our version - then if not found - go to itunes

  // goto itunes to retrieve podcast and episode list
  var url = 'https://itunes.apple.com/lookup?collectionId=' + provider_id.toString();
  request(url, function(err, res, body){
    console.log('cll return', err);
    console.log('cll return', body);
    if(err){
      return res.json(err);
    }
    if (!err && res.statusCode == 200) {
      console.log('BODY Response', body);
      return res.json(body);
    }

  });


}



/* This portion of the api will only return non-sensitive key values */


/**
 * GET /contact
 */
// exports.apiEnvKey = function(req, res) {
//   // TODO add security!!!!s
//   var environment = {};
//   var key = req.params.key;
//
//   if(key === 'all'){
//     environment.FACEBOOK_ID = process.env.FACEBOOK_ID;
//     environment.TWITTER_KEY = process.env.TWITTER_KEY;
//     environment.GOOGLE_ID = process.env.GOOGLE_ID;
//     environment.HOST = process.env.HOST;
//   }
//
//   res.json(environment);
// };
