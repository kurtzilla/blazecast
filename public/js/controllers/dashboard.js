
app.controller('DashboardCtrl', function($scope, $rootScope, $http, $stateParams, episodeService) {
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

    episodeService.populateEpisodesByItunesPodcastId(podcast.provider_id)
    .then(function(data){
      $scope.view.episodes = episodeService.episodes;
    })
    .catch(function(err){
      $scope.view.episodes = [err];
    });
  };

  $scope.unfollowPodcast = function (podcast) {
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
  };

  $scope.showFavorites = function () {
    $http.get('/api/users/' + user.id + '/favoriteEpisodes')
      .then(function(data) {
        var faveEps = data.data;
        $scope.view.episodes = faveEps;
      })
  }

});
