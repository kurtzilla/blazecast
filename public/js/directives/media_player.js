
// bc-media-player
app.directive('bcMediaPlayer', function(mediaPlayerService){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'partials/media_player.html',
    controller: function($scope) {
      $scope.view = {};
      $scope.config = {};
      // TODO make autoplay a configurable option
      $scope.config.autoPlay = true;

      $scope.config.sources = function(){
        return mediaPlayerService.sourceQueue;
      };


      //vg-player-ready="player.controller.onPlayerReady($API)"
      // API functionality
      // $scope.player = {};
      // $scope.player.controller = {};
      // var controller = this;
      // $scope.player.controller.API = null;
      //
      // $scope.player.controller.onPlayerReady = function(API) {
      //   // TODO syncplay and pause on newly added podcasts
      //   // console.log('API?', API);
				// $scope.player.controller.API = API;
      // };
    }
  }
});
