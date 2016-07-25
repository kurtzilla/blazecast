angular.module('MyApp')
.controller('BrowseCtrl', function($scope, $location) {

  $scope.view = {};
  $scope.view.showId = "";

  $scope.showPage = function(id){
    $location.path('/show/' + id);
  }

});
