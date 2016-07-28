require('dotenv').config();
var knex = require('../db/knex');
var itunesdummydata = require('../itunesdummydata');
var Audiosearch = require('../lib/audiosearch-client');
var audiosearch = new Audiosearch(process.env.AUDIOSEARCH_KEY, process.env.AUDIOSEARCH_SECRET);



exports.serveiTunesDummy = function(req, res, next) {
  res.json(itunesdummydata.data);
};

exports.followPodcast = function (req, res, next) {


  var userId = req.params.user_id;
  var providerId = req.params.podcast_id;
  var podcastName = req.body.podcastName;
  var feedUrl = req.body.feedUrl;
  var images = req.body.images;
  var episodes = req.body.episodes;
  var podcastId;



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
  .then(function(data) {
    return data;
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
        podcast_id: podcastId,
        name: episodes[i].title,
        feedUrl: episodes[i].url,
        itunes_episode_id: episodes[i].itunesEpisodeId
      })
      .catch(function(err) {
        console.log(err);
      })
      res.end()

    }
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
  // TEST ME: localhost:3000/api/users/5/favorite/179950332/96517
  var userId = req.params.user_id;
  var providerId = req.params.provider_id;
  var itunesEpisodeId = req.params.itunes_episode_id;
  // var podcastName = req.body.podcastName;
  // var episodeName = req.body.episodeName;
  // var feedUrl = req.body.feedUrl;
  // var images = req.body.images;
  var podcastId;

  // ADD TO PODCAST TABLE IF NOT THERE
  knex('podcasts')
    .where('provider_id', providerId)
    .then(function(data) {
      if (!data.length) {
        return knex('podcasts')
        .insert({
          provider_id: providerId
          // name: podcastName,
          // feedUrl: feedUrl,
          // images: images
        }).returning('id');
      } else { // podcast found in database
        return new Promise((resolve, reject) => {resolve([data[0].id])}); // return a promise to preserve chain
      }
    }).then(function(data) {
      podcastId = data[0];
    // ADD TO EPISODE TABLE IF NOT THERE
      knex('episodes')
        .where('itunes_episode_id', itunesEpisodeId)
        .then(function(data) {
          if (!data.length) {
            return knex('episodes')
            .insert({
              itunes_episode_id: itunesEpisodeId,
              podcast_id: podcastId
              // name: episodeName
            })
          }
        })
    // ADD TO JOIN TABLE IF NOT THERE, AND TOGGLE FAVORITE
    knex('users_episodes')
      .where('user_id', userId)
      .andWhere('itunes_episode_id', itunesEpisodeId)
      .then(function(data) {
        console.log(data);
        if (!data.length) {
          return knex('users_episodes')
          .insert({
            user_id: userId,
            itunes_episode_id: itunesEpisodeId,
            // user_podcast_id: [query table for id]
            favorite: true
          })
        } else {
          return knex('users_episodes')
          .update({
            favorite: !data[0].favorite
          })
          .where('user_id', userId)
          .andWhere('itunes_episode_id', itunesEpisodeId)
        }
      })
  }).then(function() {
    res.end();
  })
}

exports.saveEpisode = function(req, res, next) {
  // TEST ME: localhost:3000/api/users/5/favorite/179950332/96517
  var userId = req.params.user_id;
  var providerId = req.params.provider_id;
  var itunesEpisodeId = req.params.itunes_episode_id;
  // var podcastName = req.body.podcastName;
  // var episodeName = req.body.episodeName;
  // var feedUrl = req.body.feedUrl;
  // var images = req.body.images;
  var podcastId;

  // ADD TO PODCAST TABLE IF NOT THERE
  knex('podcasts')
    .where('provider_id', providerId)
    .then(function(data) {
      if (!data.length) {
        return knex('podcasts')
        .insert({
          provider_id: providerId
          // name: podcastName,
          // feedUrl: feedUrl,
          // images: images
        }).returning('id');
      } else { // podcast found in database
        return new Promise((resolve, reject) => {resolve([data[0].id])}); // return a promise to preserve chain
      }
    }).then(function(data) {
      podcastId = data[0];
    // ADD TO EPISODE TABLE IF NOT THERE
      knex('episodes')
        .where('itunes_episode_id', itunesEpisodeId)
        .then(function(data) {
          if (!data.length) {
            return knex('episodes')
            .insert({
              itunes_episode_id: itunesEpisodeId,
              podcast_id: podcastId
              // name: episodeName
            })
          }
        })
    // ADD TO JOIN TABLE IF NOT THERE, AND TOGGLE FAVORITE
    knex('users_episodes')
      .where('user_id', userId)
      .andWhere('itunes_episode_id', itunesEpisodeId)
      .then(function(data) {
        console.log(data);
        if (!data.length) {
          return knex('users_episodes')
          .insert({
            user_id: userId,
            itunes_episode_id: itunesEpisodeId,
            // user_podcast_id: [query table for id]
            save_for_later: true
          })
        } else {
          return knex('users_episodes')
          .update({
            save_for_later: !data[0].save_for_later
          })
          .where('user_id', userId)
          .andWhere('itunes_episode_id', itunesEpisodeId)
        }
      })
  }).then(function() {
    res.end();
  })
}

exports.getPlaylists = function(req, res, next) {
  return 'Hello'
}

// exports.saveEpisode = function(req, res, next) {
//
// }

// exports.newPlaylist = function(req, res, next) {
//
// }

exports.getEpisodes = function(req, res, next) {
  knex('episodes')
  .select('*')
  .where('podcast_id', req.params.podcast_id)
  .then(function(episodes) {
    res.json(episodes)
  })
};


/* This portion of the api will only return non-sensitive key values */
//
exports.testApi = function(req, res) {
  return knex('users').select('*').first()
  .then(function(data){
    res.json(200, data);
  });
}


// https://www.audiosear.ch/developer#!/shows/get_shows_itunes_id_id
// /api/:podcastId/episodes
// https://www.audiosear.ch/api/shows?itunes_id=1598914170424545
exports.getFedPodcastEpisodes = function(req, res, next){

  var podcast = {};
  var pId = req.params.itunes_podcast_id;

  // eCollection is the returned collection of episode objects

  return audiosearch.get('/shows', {'itunes_id':pId})
  .then(function(data){
    podcast = data;
    var episodePromises = [];
    if(podcast.episode_ids.length > 0){
      podcast.episode_ids.forEach(function(itm){
        episodePromises.push( audiosearch.getEpisode(itm) );
      });
    }
    return Promise.all(episodePromises);
  })
  .then(function(data){
    podcast.eCollection = data;
    res.send(podcast);
  })
  .catch(function(err){
    console.log('ERROR AT API CATCH', err);
    res.send(err);
  });

}
exports.unfollowPodcast = function (req, res, next) {
  var userId = req.params.user_id;
  var podcastId = req.params.podcast_id;
  knex('users_podcasts')
    .update({
      following: false
    })
    .where('podcast_id', podcastId)
    .then(function(data) {})
}
