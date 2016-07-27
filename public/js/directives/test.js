
// bc-test

app.directive('bcTest', function(){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'partials/test.html',
    controller: function($scope, $http) {
      $scope.view = {};
      $scope.view.httP = 'http://is1.mzstatic.com/image/thumb/Music4/v4/7e/0e/a5/7e0ea58f-0c19-6c76-1837-a3e970e8af5e/source/600x600bb.jpg';
      $scope.view.httPS = 'https://i.ytimg.com/vi/nAx2g0jEWcg/maxresdefault.jpg';
    }
  }
});
