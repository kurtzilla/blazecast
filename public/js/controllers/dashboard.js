
app.controller('DashboardCtrl', function($scope, $rootScope, $http, $stateParams, episodeService) {
  var user = $rootScope.currentUser;
  $scope.view = {};
  $scope.view.errors = [];
  $scope.view.name = {
    userName: user.name
  };
  $scope.view.rating = 0;
  $scope.view.ratings = [{
    current: 3,
    max: 5
  }];


  $scope.populateFollowing = function(){
    $http.get('/api/users/' + $rootScope.currentUser.id + '/follow?' + Date.now())
    .then(function(data) {
      $scope.view.following = data.data;
    });
  };
  // run on init
  $scope.populateFollowing();



  $scope.getSelectedRating = function (rating) {
    console.log(rating);
  };

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
    // console.log('UNFOLLOW ctrlr',$rootScope.currentUser.id,podcast);
    $http.post('/api/users/' + $rootScope.currentUser.id + '/unfollow/' + podcast.id)
      .then(function(data) {
        // console.log('UNFOLLOW DATA',data);
        // podcast.following = false;
        $scope.populateFollowing();
      })
    .catch(function(err){
      $scope.view.errors = [err];
    });

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
        return episodeService.populateEpisodesByEpisodeId(savedEps)
      })
      .then(function (promises) {
        Promise.all(promises)
          .then(function (data) {
            $scope.view.episodes = [];
            for (var i = 0; i < data.length; i++) {
              data[i].data.audio_url = data[i].data.audio_files[0].url[0];
              data[i].data.type = 'audio/mpeg';
              $scope.view.episodes.push(data[i].data)
            }
            $scope.$digest();
          })
      })
  };

  $scope.showFavorites = function () {
    $http.get('/api/users/' + user.id + '/favoriteEpisodes')
      .then(function(data) {
        var faveEps = data.data;
        return episodeService.populateEpisodesByEpisodeId(faveEps)
      })
      .then(function (promises) {
        Promise.all(promises)
          .then(function (data) {
            $scope.view.episodes = [];
            for (var i = 0; i < data.length; i++) {
              data[i].data.audio_url = data[i].data.audio_files[0].url[0];
              data[i].data.type = 'audio/mpeg';
              $scope.view.episodes.push(data[i].data)
            }
            $scope.$digest();
          })
      })
  }

});
