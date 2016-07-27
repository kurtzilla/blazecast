
// bc-episode-search-result
app.directive('bcEpisodeSearchResult', ['mediaPlayerService', function(mediaPlayerService){
  return {
    restrict: 'E',
    scope: {
      episode: '='
    },
    templateUrl: 'partials/episode_search_result.html',
    controller: function($scope) {
      $scope.view = {};

      $scope.addEpisodeToPlayer = function(episode){
        mediaPlayerService.addEpisodeToPlayer(episode);
      }
    }
  }
}]);
