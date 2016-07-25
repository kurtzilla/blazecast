


// bc-media-player
app.directive('bcMediaPlayer', function($rootScope, formatProtocolFilter, $location){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'partials/media_player.html',
    controller: ['$sce', function($scope, $sce) {
      $scope.view = {};
      $scope.config = {};
      $scope.config.sources = [];

      // this.config = {
      //   sources: [
      //     {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/audios/videogular.mp3"),
      //       type: "audio/mpeg"},
      //     {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/audios/videogular.ogg"),
      //       type: "audio/ogg"}
      //     ]

    }]
  }
});
