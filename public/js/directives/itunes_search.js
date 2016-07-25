
// borrowed from https://codepen.io/justspamjustin/pen/nKqwi

// bc-itunes-search
app.directive('bcItunesSearch', function($rootScope, $location){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'partials/itunes_search.html',
    controller: function($scope, Media) {
      $scope.query = '';
      $scope.displayResults = false;

      $scope.registerSearchSelection = function(result){
        // TODO save selected result to localstorage?
        $rootScope.selectedPodcast = result;
        $scope.closeMyPopup();
        $location.path('/show/' + result.collectionId.toString());
      };

      $scope.closeMyPopup = function(){
        $scope.query = '';
        $scope.displayResults = false;
      };

      $scope.$watchCollection('query', function() {
        if ($scope.query.length > 0) {
          Media.search({ query: $scope.query}, function(data) {
            $scope.displayResults = true;
            $scope.results = data.results;
          });
        } else {
          $scope.results = [];
        }
      });
    }
  }
});
