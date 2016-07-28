
// bc-media-player
app.directive('bcMediaPlayer', ['mediaPlayerService',
  function(mediaPlayerService){

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'partials/media_player.html',
    controller: function($scope) {
      $scope.view = {};
      $scope.config = {};
      // TODO make autoplay a configurable option
      $scope.config.autoPlay = true;
      $scope.config.mediaPlayerService = mediaPlayerService;

      $scope.config.sources = function(){
        return $scope.config.mediaPlayerService.sourceQueue;
      };

      // keep as a tool to fix player pause issue
      // $scope.$watchCollection('config.sources', function(newM, oldM){
      //   console.log('changed');
      //   if($scope.player.controller.API){
      //
      //     console.log('changed', $scope.player.controller.API);
      //     console.log('skipped', $scope.player.controller.API.onPause());
      //
      //     // $scope.player.controller.API.pause()
      //     // .then(function(data){
      //     //   console.log('paused - now play');
      //     // });
      //   }
      // });

      // $scope
      // $scope.config.mediaPlayerService


      //  ng-show="config.mediaPlayerService.podcastTitle.trim().length > 0 ||
      // config.mediaPlayerService.episodeTitle.trim().length > 0"

      // tag for event call
      // vg-player-ready="player.controller.onPlayerReady($API)"

      // API functionality
      // $scope.player = {};
      // $scope.player.controller = {};
      // var controller = this;
      //
      // $scope.player.controller.API = null;
      //
      $scope.player.controller.onPlayerReady = function(API) {
        // TODO syncplay and pause on newly added podcasts
        // console.log('API?', API);
        // $scope.player.controller.API = API;


      };
    }
  }
}]);
