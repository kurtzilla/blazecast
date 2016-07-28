
app.controller('ShowCtrl',
  ['$rootScope', '$scope', '$stateParams', '$http', 'podcastService', 'episodeService',
  function($rootScope, $scope, $stateParams, $http, podcastService, episodeService) {

    var _useItunes = false;
    $scope.view = {};
    $scope.view.rating = 0;
    $scope.view.ratings = [{
      current: 3,
      max: 5
    }];


    // **************************************
    // init podcast and episodes with route param var
    podcastService.populatePodcastFromItunes($stateParams.provider_id)
    .then(function(data){
      // console.log('PODSVC', podcastService);
      $scope.view.podcast = podcastService.podcast;
    })
    .catch(function(err){
      $scope.view.podcast = [err];
    });

    // init episodes with route param var - fyi this query takes longer to return
    episodeService.populateEpisodesByItunesPodcastId($stateParams.provider_id)
    .then(function(data){
      // console.log('EPISODES', data);
      $scope.view.episodes = episodeService.episodes;
    })
    .catch(function(err){
      $scope.view.episodes = [err];
    });
    // End init podcast and episodes


    $http.get('/api/users/' + $rootScope.currentUser.id + '/follow')
      .then(function(data) {
        var followedPodcasts = data.data;
        var providerId = Number($stateParams.provider_id);
        for (var i = 0; i < followedPodcasts.length; i++) {
          if (followedPodcasts[i].provider_id === providerId) {
            $scope.view.following = true;
            return;
          } else {
            $scope.view.following = false;
          }
        }
    });

    $scope.getSelectedRating = function (rating) {
      console.log(rating);
    }

    $scope.followPodcast = function () {
      $scope.view.following = !$scope.view.following;
      var userId = $rootScope.currentUser.id;
      var podcastId = $scope.view.podcast.collectionId;
      var podcastName = $scope.view.podcast.collectionName;
      var feedUrl = $scope.view.podcast.feedUrl;

      var images =  $scope.view.podcast.image_url;
      var episodes = $scope.view.episodes;

      var requestUrl = '/api/users/' + userId + '/follow/' + podcastId;

      var postData = {
        podcastName: podcastName,
        feedUrl: feedUrl,
        images: images,
        episodes: []
      };

      var episodeArray = [];

      for (var i = 0; i < episodes.length; i++) {
        var episode = {
          title: episodes[i].title,
          url: episodes[i].url,
          itunesEpisodeId: episodes[i].id // using id returned from Audiosear.ch
        }

        postData.episodes.push(episode);
      }


      $http.post(requestUrl, postData)
      .then(function(data){

      });
    }

}]);
