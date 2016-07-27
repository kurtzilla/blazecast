

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
    }
  }
}]);
