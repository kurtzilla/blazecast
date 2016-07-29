
// bc-episode-search-result
app.directive('bcEpisodeSearchResult', ['mediaPlayerService', function(mediaPlayerService){
  return {
    restrict: 'E',
    scope: {
      episode: '='
    },
    templateUrl: 'partials/episode_search_result.html',
    controller: function($scope, $http, $stateParams, $rootScope) {
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
        var user = $rootScope.currentUser;
        var providerId = $stateParams.provider_id;
        var itunesEpisodeId = episode.id;
        var podcastName = episode.show_title;
        var episodeName = episode.title;

        var postData = {
          podcastName: podcastName,
          episodeName: episodeName
        }
        $http.post('/api/users/' + user.id + '/favorite/' + providerId + '/' + itunesEpisodeId, postData)
          .then(function(){});
      };

      $scope.saveEpisode = function (episode) {
        var user = $rootScope.currentUser;
        var providerId = $stateParams.provider_id;
        var itunesEpisodeId = episode.id;
        var podcastName = episode.show_title;
        var episodeName = episode.title;


        var postData = {
          podcastName: podcastName,
          episodeName: episodeName
        }
        $http.post('/api/users/' + user.id + '/save/' + providerId + '/' + itunesEpisodeId, postData)
          .then(function(){});
      };
    }

  }
}]);
