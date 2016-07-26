angular.module('MyApp')
.controller('BrowseCtrl', function($scope, $location, $http, $stateParams) {

  $scope.view = {};
  $scope.view.showId = "";

  $http.get('/itunesdummydata').then(function(data){
    console.log(data.data.results);
    $scope.view.podcasts = data.data.results;
    
  });

  $scope.showPage = function(id){
    console.log('clicked');
    // location.assign('/show/' + id);
    $location.path('/show/' + id);
  }

});
