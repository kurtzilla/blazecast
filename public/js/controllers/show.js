
app.controller('ShowCtrl', function($rootScope, $scope, $routeParams, $http, rssFeed) {

  $scope.view = {};

  $http.jsonp('http://itunes.apple.com/lookup', {
    params: {
      'callback': 'JSON_CALLBACK',
      'id': $routeParams.provider_id
    }
  })
  .then(function(data){
    // console.log('DATA', data.data.results);
    if(data && data.data && data.data.results && data.data.results.length > 0){
      $scope.view.podcast = data.data.results[0];
      return rssFeed.loadFeed($scope.view.podcast.feedUrl);
    }
  })
  .then(function(feed){
    // console.log('feed data', feed);
    $scope.view.episodes = [];
    if(feed && feed.entries){
      feed.entries.forEach(function(episode){
        if(episode.mediaGroups && episode.mediaGroups.length > 0){
          episode.url = episode.mediaGroups[0].contents[0].url;
          episode.filesize = episode.mediaGroups[0].contents[0].fileSize;
        } else {
          episode.url = episode.link;
          episode.filesize = '';
        }
      });
      $scope.view.episodes = feed.entries;
    }
  });
});
