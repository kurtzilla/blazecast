
app.controller('DashboardCtrl', function ($scope, $rootScope, $http) {
  var user = $rootScope.currentUser;

  $scope.view = {
    userName: user.name
  };

  $http.get('/api/users/' + $rootScope.currentUser.id + '/follow').then(function(data) {
    $scope.view.following = data.data;
  })

  $scope.followPodcast = function(podcast) {

    delete $scope.view.following[podcast.id]

    $http.get('/api/podcasts/' + podcast.id + '/follow')
    .then(function(data) {
      console.log(data)


    })
  }

  $scope.getEpisodes = function(podcast) {

    $http.get('/api/podcasts/' + podcast.id + '/follow')
    .then(function(data){
      $scope.view.episodes = data.data;
    });
  }

});
