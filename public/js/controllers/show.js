
app.controller('ShowCtrl', function($rootScope, $scope, $location, $stateParams,
  $http, rssFeed, formatProtocolFilter) {

  $scope.view = {};

  $http.jsonp('https://itunes.apple.com/lookup', {
    params: {
      'callback': 'JSON_CALLBACK',
      'id': $stateParams.provider_id
    }
  })
  .then(function(data){
    // console.log('DATA', data);
    if(data && data.data && data.data.results && data.data.results.length > 0){
      $scope.view.podcast = data.data.results[0];
      console.log($scope.view.podcast);
      return rssFeed.loadFeed($scope.view.podcast.feedUrl);
    }
  })
  .then(function(feed){
    // console.log('feed data', feed);
    // console.log('LOCATION', $location.$$protocol);
    var proto = $location.$$protocol;

    $scope.view.episodes = [];

    if(feed && feed.entries){
      var entries = feed.entries.filter(function(itm){
        // console.log('REDUCER', itm);
        if(itm.mediaGroups && itm.mediaGroups.length > 0){
          itm.url = formatProtocolFilter(itm.mediaGroups[0].contents[0].url, proto);
          itm.filesize = itm.mediaGroups[0].contents[0].fileSize;
          itm.type = itm.mediaGroups[0].contents[0].type;

          return(itm.url && itm.url.trim().length > 0)
        }
      });

      // console.log('ENTRIES', entries);
      $scope.view.episodes = entries;
    }
  })
  .catch(function(err){
    // console.log('error', err);
    $scope.view.errors = [err];
    // console.log($scope.view.errors);
  });

  $scope.followPodcast = function () {
    var userId = $rootScope.currentUser.id;
    var podcastId = $scope.view.podcast.collectionId;
    var podcastName = $scope.view.podcast.collectionName;
    var feedUrl = $scope.view.podcast.feedUrl;
    var requestUrl = '/api/users/' + userId + '/follow/' + podcastId;
    var postData = {
      podcastName: podcastName,
      feedUrl: feedUrl
    };

    $http.post(requestUrl, postData)
    .then(function(data){
      console.log('you are now following this podcast');
    });
  };
});
