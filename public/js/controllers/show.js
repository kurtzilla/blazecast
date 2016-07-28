
app.controller('ShowCtrl', function($rootScope, $scope, $stateParams, $http, rssFeed) {

  var _useItunes = false;
  $scope.view = {};
  $scope.view.podcast = {};
  $scope.view.episodes = [];
  $scope.view.rating = 0;
  $scope.view.ratings = [{
    current: 3,
    max: 5
  }]

  $http.get('/api/users/' + $rootScope.currentUser.id + '/follow')
    .then(function(data) {
      var followedPodcasts = data.data;
      var providerId = Number($stateParams.provider_id);
      for (var i = 0; i < followedPodcasts.length; i++) {
        if (followedPodcasts[i].provider_id === providerId) {
          $scope.view.following = true;
          return;
        } else {
          $scope.view.following = false;
        }
      }
    });

  $scope.getSelectedRating = function (rating) {
    console.log(rating);
  }

  if(!_useItunes){

    // Call api to get episodes on our behalf - use podcast id
    // /api/:podcastId/episodes
    $http.get('/api/podcasts/' + $stateParams.provider_id + '/episodes')
    .then(function(data){

      if(data.data.error){
        // throw Error(data.data.error); // THIS LOGS AN ERROR TO THE CONSOLE!!!
        $scope.view.errors = ['We\'re sorry, there is no information for that podcast'];
        return;
      }

      // TODO verify feedUrl from url??
      // TODO verify artistName from ??
      $scope.view.podcast = data.data;
      $scope.view.podcast.collectionId = $stateParams.provider_id;
      $scope.view.podcast.collectionName = $scope.view.podcast.title;
      $scope.view.podcast.artistName = $scope.view.podcast.network;
      $scope.view.podcast.feedUrl =
        ($scope.view.podcast.urls && $scope.view.podcast.urls.ui) ? $scope.view.podcast.urls.ui : '';

      $scope.view.podcast.primaryGenreName = '';
      $scope.view.podcast.releaseDate = '';

      $scope.view.podcast.image_url = '';
      if($scope.view.podcast.image_files && $scope.view.podcast.image_files[0]){
        $scope.view.podcast.image_url =
          ($scope.view.podcast.image_files[0].url.thumb) ?
            $scope.view.podcast.image_files[0].url.thumb : $scope.view.podcast.image_files[0].url.full;
      }

      if ($scope.view.podcast.eCollection) {

        var episodes = $scope.view.podcast.eCollection.filter(function (itm) {
          itm.itunes_episode_id = itm.itunes_episode;

          if (itm.audio_files && itm.audio_files.length > 0) {
            var audio = itm.audio_files[0];
            // TODO filter urls
            itm.audio_url = audio.url[0];

            if (itm.audio_url &&
                itm.audio_url.trim().length > 0 &&
                itm.audio_url.trim().toLowerCase().indexOf('.mp') !== -1){

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
          return false;
        });
      } else {
        $scope.view.episodes = [];// reset
      }
      $scope.view.episodes = episodes;
      console.log('$scope:', $scope);
    })
    .catch(function(err){
      $scope.view.errors = ['We\'re sorry, there is no information for that podcast'];
    });

    // END OF AUDIOSEAR.CH search


  } else { // iTunes search

    $http.jsonp('https://itunes.apple.com/lookup', {
      params: {
        'callback': 'JSON_CALLBACK',
        'id': $stateParams.provider_id
      }
    })
    .then(function (data) {
      if (data && data.data && data.data.results && data.data.results.length > 0) {
        $scope.view.podcast = data.data.results[0];
        $scope.view.podcast.image_url = $scope.view.podcast.artworkUrl600;
        return rssFeed.loadFeed($scope.view.podcast.feedUrl);
      }
    })
    .then(function (feed) {

      if (feed && feed.entries) {
        var episodes = feed.entries.filter(function (itm) {
          if (itm.mediaGroups && itm.mediaGroups.length > 0) {
            itm.audio_url = itm.mediaGroups[0].contents[0].url;
            itm.filesize = itm.mediaGroups[0].contents[0].fileSize;
            itm.type = itm.mediaGroups[0].contents[0].type;

            return (itm.audio_url && itm.audio_url.trim().length > 0)

          } else if (itm.url && itm.url.trim().length > 0 && itm.toLowerCase().indexOf('.mp') !== -1) {
            itm.audio_url = itm.url;
            itm.type = "audio/mpeg";
            return true;
          }
        });

        $scope.view.episodes = episodes;
      } else {
        $scope.view.episodes = [];// reset
      }
    })
    .catch(function (err) {
      $scope.view.errors = [err];
    });
  }

  $scope.followPodcast = function () {
    $scope.view.following = !$scope.view.following;
    var userId = $rootScope.currentUser.id;
    var podcastId = $scope.view.podcast.collectionId;
    var podcastName = $scope.view.podcast.collectionName;
    var feedUrl = $scope.view.podcast.feedUrl;

    var images =  $scope.view.podcast.image_url;
    var episodes = $scope.view.episodes;

    var requestUrl = '/api/users/' + userId + '/follow/' + podcastId;

    var postData = {
      podcastName: podcastName,
      feedUrl: feedUrl,
      images: images,
      episodes: []
    };

    var episodeArray = [];

    for (var i = 0; i < episodes.length; i++) {
      console.log('episodes[i]:', episodes[i]);
      var episode = {
        title: episodes[i].title,
        url: episodes[i].url,
        itunesEpisodeId: episodes[i].id
      }
      // console.log('episode:', episode);
      postData.episodes.push(episode);
    }

    $http.post(requestUrl, postData)
    .then(function(data){

    });
  };
});
