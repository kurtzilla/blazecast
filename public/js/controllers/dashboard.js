
app.controller('DashboardCtrl', function ($scope, $rootScope, $http) {
  var user = $rootScope.currentUser;

  $scope.view = {
    userName: user.name
  };

  $http.get('/api/users/' + $rootScope.currentUser.id + '/follow').then(function(data) {
    $scope.view.following = data.data;
    console.log('HERE')
  })

  $scope.getEpisodes = function(podcast) {
    // var requestUrl = '/api/podcasts/' + podcast.id;
    // console.log(podcast);
    // console.log('Find episodes for podcast ' + JSON.stringify($scope.view.following[podcast.id - 1].episodes));

    $http.get('/api/podcasts/' + podcast.id + '/follow')
    .then(function(data){
      $scope.view.episodes = data.data;
    });
  }

});
