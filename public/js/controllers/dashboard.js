
app.controller('DashboardCtrl', function ($scope, $rootScope, $http, $stateParams) {
  var user = $rootScope.currentUser;

  $scope.view = {
    userName: user.name
  };

  $http.get('/api/users/' + $rootScope.currentUser.id + '/follow').then(function(data) {
    $scope.view.following = data.data;
  });

  $scope.getEpisodes = function(podcast) {

    $http.get('/api/podcasts/' + podcast.id + '/follow')
    .then(function(data){
      $scope.view.episodes = data.data;
    });
  };

  $scope.unfollowPodcast = function (podcast) {
    console.log(podcast.id);
    $http.post('/api/users/' + $rootScope.currentUser.id + '/unfollow/' + podcast.id)
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
