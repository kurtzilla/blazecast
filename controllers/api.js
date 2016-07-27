// require('dotenv').config();

var knex = require('../db/knex');
var itunesdummydata = require('../itunesdummydata');
// var Audiosearch = require('../lib/audiosearch-client');
// var audiosearch = new Audiosearch(process.env.AUDIOSEARCH_KEY, process.env.AUDIOSEARCH_SECRET);


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

/* This portion of the api will only return non-sensitive key values */
//
exports.testApi = function(req, res) {
  // console.log('REQ', req.body);
  return knex('users').select('*').first()
  .then(function(data){
    res.json(200, data);
  });
}


// /api/:podcastId/episodes
exports.getFedPodcastEpisodes = function(req, res, next){
  //
  // var podcast = {};
  // var pId = req.params.itunes_podcast_id;
  // // console.log('BEGIN API CALL', pId);
  // // take the id and get episodes from
  // // var url = '?itunes_id=' + pId;
  //
  // // info for api call
  // // https://www.audiosear.ch/developer#!/shows/get_shows_itunes_id_id
  // // GET /shows?itunes_id={id}
  // // https://www.audiosear.ch/api/shows?itunes_id=1598914170424545
  // audiosearch.get('/shows', {'itunes_id':pId})
  // .then(function(data){
  //   // console.log('DATA', data);
  //   podcast = data;
  //   var episodePromises = [];
  //
  //   if(podcast.episode_ids.length > 0){
  //     podcast.episode_ids.forEach(function(itm){
  //       episodePromises.push(
  //         audiosearch.getEpisode(itm)
  //       );
  //     });
  //   }
  //   return Promise.all(episodePromises);
  // })
  // .then(function(data){
  //   // console.log('EPISODES', data);
  //   podcast.eCollection = data;
  //
  //   res.send(podcast);
  // })
  // .catch(function(err){
  //   console.log('ERROR', err);
  // });
  //
  //


}

// // TODO this is actually an oAuth auth call - might not need
// exports.episodesSearch = function(req, res){
//   console.log('hit Episode Search API');
//
// }


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
