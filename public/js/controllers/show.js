
app.controller('ShowCtrl', function($rootScope, $scope, $location, $stateParams, $http, rssFeed, formatProtocolFilter) {

  var proto = $location.$$protocol;
  var _useItunes = false;
  $scope.view = {};
  $scope.view.podcast = {};
  $scope.view.episodes = [];

  if(!_useItunes){

    // Call api to get episodes on our behalf - use podcast id
    // /api/:podcastId/episodes
    $http.get('/api/podcasts/' + $stateParams.provider_id + '/episodes')
    .then(function(data){
      // console.log('FINAL', data.data.error);

      if(data.data.error){
        // throw Error(data.data.error); // THIS LOGS AN ERROR TO THE CONSOLE!!!
        $scope.view.errors = ['We\'re sorry, there is no information for that podcast'];
        return;
      }

      $scope.view.podcast = data.data;
      // console.log('PODCAST', $scope.view.podcast);
      //artworkUrl600, collectionName (title), primaryGenreName, releaseDate, description
      $scope.view.podcast.collectionName = $scope.view.podcast.title;

      // TODO is it worth it to ping the api more times to get category info?
      // TODO is releaseDate relevant for a podcast? We do have that info for episodes
      $scope.view.podcast.primaryGenreName = '';
      $scope.view.podcast.releaseDate = '';
      // $scope.view.podcast.description = '';
      if($scope.view.podcast.image_files && $scope.view.podcast.image_files[0]){
        $scope.view.podcast.artworkUrl600 =
          ($scope.view.podcast.image_files[0].url.thumb) ?
            $scope.view.podcast.image_files[0].url.thumb : $scope.view.podcast.image_files[0].url.full;
      }

      if ($scope.view.podcast.eCollection) {
        // console.log('LEN', $scope.view.podcast.eCollection.length);

        var entries = $scope.view.podcast.eCollection.filter(function (itm) {
          // console.log('REDUCER', itm);
          //title, publishedDate, contentSnippet

          // digitalLocation ???? - on first try, file didn't yield a file

          if (itm.audio_files && itm.audio_files.length > 0) {
            var audio = itm.audio_files[0];
            // TODO filter urls
            itm.url = formatProtocolFilter(audio.url[0], proto);

            if (itm.url && itm.url.trim().length > 0 && itm.url.trim().toLowerCase().indexOf('.mp') !== -1){
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
      // console.log('ENTRIES', entries);
      $scope.view.episodes = entries;

    })
    .catch(function(err){
      // console.log('ERROR', err);
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
