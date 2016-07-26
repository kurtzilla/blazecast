
app.controller('ShowCtrl', function($rootScope, $scope, $location, $routeParams,
  $http, rssFeed, formatProtocolFilter) {

  $scope.view = {};

  $http.jsonp('https://itunes.apple.com/lookup', {
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
});
