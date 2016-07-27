var knex = require('../db/knex');
var itunesdummydata = require('../itunesdummydata');

var podcastCount = 0;

exports.serveiTunesDummy = function(req, res, next) {
  res.json(itunesdummydata.data);
};

exports.followPodcast = function (req, res, next) {

  podcastCount ++;

  var userId = req.params.user_id;
  var providerId = req.params.podcast_id;
  var podcastName = req.body.podcastName;
  var feedUrl = req.body.feedUrl;
  var images = req.body.images;
  var episodes = req.body.episodes;
  var podcastId;

  console.log(episodes)

  // var episodes =

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
    for (var i = 0; i < episodes.length; i++) {

      knex('episodes')
      .insert({
        podcast_id: podcastCount,
        name: episodes[i].title
      })
      .catch(function(err) {
        console.log(err);
      })
      res.end()

    }
  });

    // knex('episodes')
    // .insert({
    //   podcast_id: providerId,
    //   name: episodes.title
    // })
    // .catch(function(err) {
    //   console.log(err);
    // })
}

// exports.addEpisodes = function(req, res, next) {
//   console.log(req);
// }

// exports.getUserDashboard = function (req, res, next) {
//   knex.queryBuilder()
//     .select('podcasts.images', 'podcasts.name', 'podcasts.feedUrl')
//     .from('podcasts')
//     .innerJoin('users_podcasts', 'podcasts.id', 'podcast_id')
//     .innerJoin('users', 'users.id', 'user_id')
//     .where('users.id', req.params.user_id)
//     .then(function(data) {
//       console.log(data)
//       res.json(data);
//     });

exports.getFollows = function(req, res, next) {
  var userId = req.params.user_id;
  console.log('through')
  knex('podcasts')
    .join('users_podcasts','podcasts.id', '=', 'podcast_id')
    .where('user_id', userId)
    .andWhere('following', true)
    .then(function(follows) {
      // console.log(follows)
      res.json(follows)
    })

};

exports.getEpisodes = function(req, res, next) {
  console.log("SOMETHING")
  knex('episodes')
  // .join('users_podcasts','podcasts.id', '=', 'podcast_id')
  .where('podcast_id', req.params.podcast_id)
  // .andWhere('following', true)
  .then(function(episodes) {
    // console.log(follows)
    console.log(episodes)
    res.json(episodes)
  })
};

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
