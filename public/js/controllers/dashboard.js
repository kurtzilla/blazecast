
app.controller('DashboardCtrl', function ($scope, $rootScope, $http, $stateParams) {
  var user = $rootScope.currentUser;

  $scope.view = {
    userName: user.name
  };

  $http.get('/api/users/' + $rootScope.currentUser.id + '/follow').then(function(data) {
    $scope.view.following = data.data;
  });

  $scope.getEpisodes = function(podcast) {
    console.log(podcast.id);
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
    console.log('following:', following);
    console.log('episode:', episode);
    var providerId = following[0].provider_id;
    var itunesEpisodeId = episode.itunes_episode_id;
    console.log('providerId:', providerId);
    console.log('itunesEpisodeId:', itunesEpisodeId);
    console.log('/api/users/' + user.id + '/favorite/' + providerId + '/' + itunesEpisodeId);
    $http.post('/api/users/' + user.id + '/favorite/' + providerId + '/' + itunesEpisodeId)
      .then(function(){});
  };

});
