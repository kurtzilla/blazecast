
app.controller('DashboardCtrl', function ($scope, $rootScope, $http) {
  var user = $rootScope.currentUser;

  $scope.view = {
    userName: user.name
  };

  $http.get('/api/users/' + $rootScope.currentUser.id + '/follow').then(function(data) {
    $scope.view.following = data.data;
  })

  $scope.getEpisodes = function(podcast) {
    $http.get('/api/podcasts/' + podcast.id + '/follow')
    .then(function(data){
      $scope.view.episodes = data.data;
    });
  }

  $scope.unfollowPodcast = function (index) {
    $http.post('/api/users/' + $rootScope.currentUser.id + '/unfollow/' + $scope.view.following[index].id)
      .then(function(data) {})
  }

});
