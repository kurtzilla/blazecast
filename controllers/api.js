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
  var images = req.body.images;
  var podcastId;

  // first, check to see if podcast is already in database
  knex('podcasts')
    .where('provider_id', providerId)
    .then(function(data) {
      if (!data.length) { // podcast is not present in database
        return knex('podcasts')
          .insert({
            provider_id: providerId,
            name: podcastName,
            feedUrl: feedUrl,
            images: images
          })
          .returning('id');
      } else { // podcast found in database
        return new Promise((resolve, reject) => {resolve([data[0].id])}); // return a promise to preserve chain
      }
    })
    .then(function(data) { // check to see if podcast is already followed by this user
      podcastId = data[0];
      return knex('users_podcasts')
        .where('user_id', userId)
        .andWhere('podcast_id', podcastId);
    })
    .then(function(data) {
      var following = data[0] ? data[0].following : true;
      if (!data.length) {
        return knex('users_podcasts')
        .insert({
          user_id: userId,
          podcast_id: podcastId,
          following: true
        });
      } else {
        return knex('users_podcasts')
          .update({
            following: !following
          })
          .where('podcast_id', podcastId);
      }
    })
    .then(function() {
      res.end();
    });
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

exports.favoriteEpisode = function(req, res, next) {
  var userId = req.params.user_id;
  var providerId = req.params.provider_id;
  var episodeId = req.params.episode_id;
  // var podcastName = req.body.podcastName;
  // var episodeName = req.body.episodeName;
  // var feedUrl = req.body.feedUrl;
  // var images = req.body.images;

  // ADD TO PODCAST TABLE IF !
  knex('podcast')
    .where('provider_id', providerId)
    .then(function(data) {
      if (!data.length) {
        knex('podcasts')
        .insert({
          provider_id: providerId
          // name: podcastName,
          // feedUrl: feedUrl,
          // images: images
        }).returning('id');
      } else { // podcast found in database
        return new Promise((resolve, reject) => {resolve([data[0].id])}); // return a promise to preserve chain
      }
    }).then(function(podcastId) {
    // ADD TO EPISODE TABLE IF !
      knex('episodes')
        .where('episode_id', episodeId)
        .then(function(data) {
          if (!data.length) {
            knex('episodes')
            .insert({
              itunes_episode_id: episodeId,
              podcast_id: podcastId
              // name: episodeName
            })
          }
        })
    // ADD TO JOIN TABLE IF !, AND TOGGLE FAVORITE
    knex('users_episodes')
      .where('user_id', userId)
      .andWhere('episode_id', episodeId)
      .then(function(data) {
        if (!data.length) {
          knex('users_episodes')
          .insert({
            user_id: userId,
            episode_id: episodeId,
            // user_podcast_id: [query table for id]
            favorite: true
          })
        } else {
          knex('users_episodes')
          .where('user_id', userId)
          .andWhere('episode_id', episodeId)
          .update('favorite', !data.favorite)
        }
      })
  })
}

// exports.saveEpisode = function(req, res, next) {
//
// }

// exports.newPlaylist = function(req, res, next) {
//
// }

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
