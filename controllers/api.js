var itunesdummydata = require('../itunesdummydata');

/* This portion of the api will only return non-sensitive key values */

exports.serveiTunesDummy = function(req, res, next) {
  res.json(itunesdummydata.data);
};

exports.addPodcastToFavorites = function (req, res, next) {
  console.log('ok');
  res.end('ok');
}

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
