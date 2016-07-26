var knex = require('../db/knex');
var itunesdummydata = require('../itunesdummydata');

exports.serveiTunesDummy = function(req, res, next) {
  res.json(itunesdummydata.data);
};

exports.followPodcast = function (req, res, next) {
  var userId = req.params.user_id;
  var providerId = req.params.podcast_id;
  var podcastName = req.body.podcastName;
  var feedUrl = req.body.feedUrl;

  // first, check to see if podcast is already in database
  knex('podcasts')
    .where('provider_id', providerId)
    .then(function(data) {
      if (!data.length) { // podcast is not present in database
        return knex('podcasts')
          .insert({
            provider_id: providerId,
            name: podcastName,
            feedUrl: feedUrl
          })
          .returning('id');
      } else { // podcast found in database
        return new Promise((resolve, reject) => {resolve([data[0].id])}); // return a promise to preserve chain
      }
    })
    .then(function(data) {
      var podcastId = data[0];
      return knex('users_podcasts')
        .insert({
          user_id: userId,
          podcast_id: podcastId,
          following: true
        })
    })
    .then(function(data) {
      res.end();
    })
}


exports.getFollows = function(req, res, next) {
  var userId = req.params.user_id;
  knex('podcasts')
    .join('users_podcasts','podcasts.id', '=', 'podcast_id')
    .where('user_id', userId)
    .andWhere('following', true)
    .then(function(follows) {
      res.json(follows)
    })
};

// exports.getUserDashboard = function (req, res, next) {
//   knex.queryBuilder()
//     .select('podcasts.name')
//     .from('podcasts')
//     .innerJoin('users_podcasts', 'podcasts.id', 'podcast_id')
//     .innerJoin('users', 'users.id', 'user_id')
//     .where('users.id', req.params.user_id)
//     .then(function(data) {
//       res.json(data);
//     });
// };

/* This portion of the api will only return non-sensitive key values */
//
exports.testApi = function(req, res) {
  // console.log('REQ', req.body);
  return knex('users').select('*').first()
  .then(function(data){
    res.json(200, data);
  });
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
