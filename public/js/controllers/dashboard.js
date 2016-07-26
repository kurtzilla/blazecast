

app.controller('DashboardCtrl', function ($scope, $rootScope, $http) {
  var user = $rootScope.currentUser;

  $scope.view = {
    userName: user.name
  };

  $http.get('/api/users/' + user.id + '/dashboard')
    .then(function (data) {
      console.log(data);
      $scope.view.following = data.data;
    })

  // console.log(user);


});
