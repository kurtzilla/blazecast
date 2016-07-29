
app.controller('DashboardCtrl', function ($scope, $rootScope, $http, $stateParams) {
  var user = $rootScope.currentUser;
  $scope.view = {};
  $scope.view.name = {
    userName: user.name
  };
  $scope.view.rating = 0;
  $scope.view.ratings = [{
    current: 3,
    max: 5
  }];
  $scope.getSelectedRating = function (rating) {
    console.log(rating);
  }

  $http.get('/api/users/' + $rootScope.currentUser.id + '/follow').then(function(data) {
    $scope.view.following = data.data;
  });

  $scope.getEpisodes = function(podcast) {

    $http.get('/api/podcasts/' + podcast.id + '/follow')
    .then(function(data){
      $scope.view.episodes = data.data;
    });
  };

  $scope.unfollowPodcast = function (index) {
    $http.post('/api/users/' + $rootScope.currentUser.id + '/unfollow/' + $scope.view.following[index].id)
      .then(function(data) {})
  };

  $scope.favoriteEpisode = function (following, episode) {
    var providerId = following[0].provider_id;
    var itunesEpisodeId = episode.itunes_episode_id;
    $http.post('/api/users/' + user.id + '/favorite/' + providerId + '/' + itunesEpisodeId)
      .then(function(){});
  };

  $scope.saveEpisode = function (following, episode) {
    var providerId = following[0].provider_id;
    var itunesEpisodeId = episode.itunes_episode_id;
    $http.post('/api/users/' + user.id + '/save/' + providerId + '/' + itunesEpisodeId)
      .then(function(){});
  };

  $scope.showSaved = function () {
    $http.get('/api/users/' + user.id + '/savedPodcasts')
      .then(function(data){
        var savedEps = data.data;
        $scope.view.episodes = savedEps;
      });
  }

});
