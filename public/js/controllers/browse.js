angular.module('MyApp')
.controller('BrowseCtrl', function($rootScope, $scope, $location, $http, $stateParams, Media) {

  $scope.view = {};
  $scope.view.showId = "";
  $scope.view.query = '';
  $scope.view.filterBy = '';
  $scope.filterByCategory = function(item){
    if(!$scope.view.filterBy || $scope.view.filterBy.trim().length === 0){

      return true;
    }
    return item.genres.join().indexOf($scope.view.filterBy) !== -1;
  }

  $scope.showPage = function(id){
    // location.assign('/show/' + id);
    $location.path('/show/' + id);
  }

  $scope.registerSearchSelection = function(result){
    // TODO save selected result to localstorage?
    $rootScope.selectedPodcast = result;
    $scope.closeMyPopup();
    $location.path('/show/' + result.collectionId.toString());
  };

  $scope.changeView(type) {
    if (type === 'grid') {
      $('.grid').css('flex-direction', 'row');
      $scope.browseView = 'grid';
    } else if (type === 'list') {
      $('.grid').css('flex-direction', 'column');
      $scope.browseView = 'list';
    }
  }

  $scope.$watchCollection('view.query', function() {
    $scope.view.filterBy = '';
    // console.log($scope.view.query);
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
