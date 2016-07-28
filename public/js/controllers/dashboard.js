
app.controller('DashboardCtrl', function ($scope, $rootScope, $http) {
  var user = $rootScope.currentUser;

  $scope.view = {
    userName: user.name
  };

  $http.get('/api/users/' + $rootScope.currentUser.id + '/follow').then(function(data) {
    $scope.view.following = data.data;
  });

  $scope.unfollowPodcast = function(podcast) {
    $http.post('/api/podcasts/' + podcast.id + '/follow')
  }

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

  $scope.favoriteEpisode = function (episode) {
    var podcastId = episode.podcast_id;
    var itunesEpisodeId = episode.itunes_episode_id;
    $http.get('/api/podcasts/' + podcastId + '/follow')
        .then(function(data){
          return $http.post('/api/users/' + user.id + '/favorite/' + podcastId + '/' + itunesEpisodeId);
        })
        .then(function(){});
  };

  $scope.getPlaylists = function() {
    $http.get('/api/users/' + $rootScope.currentUser.id + '/playlists')
    .then(function(data){

    })
  }

});
