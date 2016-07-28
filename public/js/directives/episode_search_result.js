
// bc-episode-search-result
app.directive('bcEpisodeSearchResult', ['mediaPlayerService', function(mediaPlayerService){
  return {
    restrict: 'E',
    scope: {
      episode: '='
    },
    templateUrl: 'partials/episode_search_result.html',
    controller: function($scope, $http) {
      $scope.view = {};
      $scope.view.rating = 0;
      $scope.view.ratings = [{
        current: 3,
        max: 5
      }]

      $scope.getSelectedRating = function (rating) {
         console.log(rating);
     }

      $scope.addEpisodeToPlayer = function(episode){
        mediaPlayerService.addEpisodeToPlayer(episode);
      }
      $scope.favoriteEpisode = function (episode) {
        console.log('episode:', episode);
        $http.post('/api/podcasts/' + episode.id + '/getDBID', episode)
            .then(function(data){
              console.log("LALALA:", data);
            })
        var podcastId = episode.podcast_id;
        var itunesEpisodeId = episode.itunes_episode_id;
        console.log('podcastId:', podcastId);
        console.log('itunesEpisodeId:', itunesEpisodeId);

        $http.get('/api/podcasts/' + podcastId + '/follow')
            .then(function(data){
              return $http.post('/api/users/' + user.id + '/favorite/' + podcastId + '/' + itunesEpisodeId);
            })
            .then(function(){});
      };
    }

  }
}]);
