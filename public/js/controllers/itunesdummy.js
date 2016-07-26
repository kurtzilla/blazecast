app.controller('DumCtrl', function($rootScope, $scope, $location, $stateParams,
  $http, rssFeed, formatProtocolFilter) {

  $scope.view = {};

  $http.get('/itunesdummydata')
    .then(function(data){
    console.log(data);
  })

  
});
