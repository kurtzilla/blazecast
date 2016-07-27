angular.module('MyApp')
.controller('BrowseCtrl', function($rootScope, $scope, $location, $http, $stateParams, Media) {

  $scope.view = {};
  $scope.view.showId = "";
  $scope.view.query = '';

  $scope.showPage = function(id){
    console.log('clicked');
    // location.assign('/show/' + id);
    $location.path('/show/' + id);
  }

  $scope.registerSearchSelection = function(result){
    // TODO save selected result to localstorage?
    $rootScope.selectedPodcast = result;
    $scope.closeMyPopup();
    $location.path('/show/' + result.collectionId.toString());
  };

  $scope.$watchCollection('view.query', function() {
    if ($scope.view.query.length > 0) {
      Media.search({ query: $scope.view.query}, function(data) {
        $scope.displayResults = true;
        $scope.view.podcasts = data.results;

      });
    } else {
      $http.get('/itunesdummydata').then(function(data){
        $scope.view.podcasts = data.data.results;
      });
    }
  });
});
