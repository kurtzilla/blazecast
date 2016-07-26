
app.controller('DashboardCtrl', function($rootScope, $scope, $http) {

  $scope.view = {};

  $http.get('/api/users/' + $rootScope.currentUser.id + '/follow').then(function(data) {
    $scope.view.follows = data.data;
  })

});
