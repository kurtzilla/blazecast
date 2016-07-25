app.controller('DumCtrl', function($rootScope, $scope, $location, $stateParams,
  $http, rssFeed, formatProtocolFilter) {

  $scope.view = {};

  $http.get('/itunesdummydata')
    .then(function(data){
    console.log(data);
  })

  $http.jsonp('https://itunes.apple.com/lookup', {
    params: {
      'callback': 'JSON_CALLBACK',
      'id': $stateParams.provider_id
    }
  })
  .then(function(data){
    console.log('DATA', data);
  })
});
