

app.service('podcastService', ['$q', '$http', function($q, $http) {

  var _self = this;
  this.podcast = {};

  this.populatePodcastFromItunes = function(itunes_podcast_id){

    var deferral = $q.defer();

    $http.jsonp('https://itunes.apple.com/lookup', {
      params: {
        'callback': 'JSON_CALLBACK',
        'id': itunes_podcast_id
      }
    })
    .then(function (data) {
      _self.podcast = {};
      if (data && data.data && data.data.results && data.data.results.length > 0) {
        _self.podcast = data.data.results[0];
        _self.podcast.image_url = _self.podcast.artworkUrl600; // normalize
        deferral.resolve(_self.podcast);
      } else {
        deferral.reject('Podcast not found at itunes for id: ' + itunes_podcast_id.toString());
      }
    });

    return deferral.promise;
  };
}]);




app.service('episodeService', ['$q', '$http', function($q, $http) {

  var _self = this;
  this.podcast_byAudioSearch = {};
  this.episodes = [];

  this.populateEpisodesByItunesPodcastId = function(itunes_podcast_id) {

    var deferral = $q.defer();

    $http.get('/api/podcasts/' + itunes_podcast_id + '/episodes')
    .then(function (data) {
      _self.podcast_byAudioSearch = {};
      _self.episodes = [];

      if (data.data.error) {
        deferral.reject('No podcast information found at AudioSear.ch');
      } else {
        _self.podcast_byAudioSearch = data.data;

        // eCollection is returned episodes
        if (_self.podcast_byAudioSearch.eCollection) {
          // normalize episodes
          _self.episodes = _self.podcast_byAudioSearch.eCollection.filter(function (itm) {

            itm.itunes_episode_id = itm.itunes_episode;

            if (itm.audio_files && itm.audio_files.length > 0) {
              itm.audio_url = itm.audio_files[0].url[0];

              if (itm.audio_url &&
                itm.audio_url.trim().length > 0 &&
                itm.audio_url.trim().toLowerCase().indexOf('.mp') !== -1) {

                itm.publishedDate = itm.date_added;
                itm.contentSnippet =
                  (itm.description.trim().length > 255) ?
                  itm.description.trim().substr(0, 255) + '...' :
                    itm.description.trim();
                itm.filesize = itm.duration;
                itm.type = "audio/mpeg";
                return true;
              }
            }

          });// end filter

          deferral.resolve(_self.episodes);
        }//end of eCollection

      } // end else
    })// end of http promise
    .catch(function(err){
      deferral.reject('Audiosearch file not found or error fetching podcasts and episodesitunes for id: ' + itunes_podcast_id.toString());
    });// end of promise chain

    return deferral.promise;
  };

  this.populateEpisodesByEpisodeId = function (faveEps) {
    var promises = [];
    for (var i = 0; i < faveEps.length; i++) {
      var epId = faveEps[i].itunes_episode_id
      console.log('epId:', epId);
      var promise = $http.get('/api/episodes/' + epId);
      promises.push(promise);
    }
    return promises;
  }
}]);
