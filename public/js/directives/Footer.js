app.directive('socialFooterButtons', function(){
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'partials/socialFooter.html',
    controller: function ($scope){
      $scope.FB = function(){
        var win = window.open("https://www.facebook.com/Blazecast-274572072921107/", '_blank');
        win.focus();
      }
      $scope.Twitter = function(){
        var win = window.open("https://twitter.com/gBlazecast", '_blank');
        win.focus();
      }
      $scope.Google = function() {
        var win = window.open("https://plus.google.com/u/1/101966462673175494431/posts", '_blank');
        win.focus();
      }
    }
  }
})
