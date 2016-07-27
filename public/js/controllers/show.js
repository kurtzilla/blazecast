app.controller('ShowCtrl', function($rootScope, $scope, $location, $stateParams, $http, rssFeed, formatProtocolFilter) {

  $scope.view = {};
  $scope.view.podcast = {};
  $scope.view.episodes = [];

  var proto = $location.$$protocol;
  var _useItunes = true;


  if(!_useItunes){

    // Call api to get episodes on our behalf - use podcast id
    // /api/:podcastId/episodes
    $http.get('/api/' + $stateParams.provider_id + '/episodes')
    .then(function(data){
      // display returned collection of episodes
      // console.log('FINAL', data);
      $scope.view.podcast = data.data;
      console.log('FINAL', $scope.view.podcast);
      console.log('PROTO', proto);

      if ($scope.view.podcast.eCollection) {
        console.log('LEN', $scope.view.podcast.eCollection.length);
        var entries = $scope.view.podcast.filter(function (itm) {
          console.log('REDUCER', itm);
          if (itm.audio_files && itm.audio_files.length > 0) {
      //       var audio = itm.audio_files[0];
      //       itm.url = formatProtocolFilter(audio.url[0], proto);
      //       itm.filesize = itm.duration;
      //       itm.type = "audio/mpeg";
      //
      //       return (itm.url && itm.url.trim().length > 0)
          }
        });
      } else {
        $scope.view.episodes = [];// reset
      }

      // console.log('ENTRIES', entries);
      // $scope.view.episodes = entries;

    })
    .catch(function(err){
      // TODO log errors "can't connect" etc
      $scope.view.errors = [err];
    });




  } else {

    $http.jsonp('https://itunes.apple.com/lookup', {
      params: {
        'callback': 'JSON_CALLBACK',
        'id': $stateParams.provider_id
      }
    })
    .then(function (data) {
      // console.log('DATA', data);
      if (data && data.data && data.data.results && data.data.results.length > 0) {
        $scope.view.podcast = data.data.results[0];
        return rssFeed.loadFeed($scope.view.podcast.feedUrl);
      }
    })
    .then(function (feed) {
      // console.log('feed data', feed);

      if (feed && feed.entries) {
        var entries = feed.entries.filter(function (itm) {
          if (itm.mediaGroups && itm.mediaGroups.length > 0) {
            itm.url = formatProtocolFilter(itm.mediaGroups[0].contents[0].url, proto);
            itm.filesize = itm.mediaGroups[0].contents[0].fileSize;
            itm.type = itm.mediaGroups[0].contents[0].type;

            return (itm.url && itm.url.trim().length > 0)

          } else if (itm.url && itm.url.trim().length > 0 &&
            (itm.toLowerCase().indexOf('.mp3') !== -1 || itm.toLowerCase().indexOf('.mp4') !== -1)) {
            itm.type = "audio/mpeg";
            return true;
          }
        });

        // console.log('ENTRIES', entries);
        $scope.view.episodes = entries;
      } else {
        $scope.view.episodes = [];// reset
      }
    })
    .catch(function (err) {
      // console.log('error', err);
      $scope.view.errors = [err];
    });
  }



  $scope.followPodcast = function () {
    var userId = $rootScope.currentUser.id;
    var podcastId = $scope.view.podcast.collectionId;
    var podcastName = $scope.view.podcast.collectionName;
    var feedUrl = $scope.view.podcast.feedUrl;
    var images = $scope.view.podcast.artworkUrl600;
    var requestUrl = '/api/users/' + userId + '/follow/' + podcastId;

    var postData = {
      podcastName: podcastName,
      feedUrl: feedUrl,
      images: images
    };

    $http.post(requestUrl, postData)
    .then(function(data){
      console.log('you are now following this podcast');
    });
  };
});
