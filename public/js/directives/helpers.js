
// http://vadimpopa.com/onblur-like-for-a-div-in-angularjs-to-close-a-popup/
app.directive("outsideClick", ['$document','$parse', function( $document, $parse ){
  return {
    restrict: 'A',
    link: function( $scope, $element, $attributes ){
      var _self = this;

      var scopeExpression = $attributes.outsideClick,
        onDocumentClick = function(event){

          var isChild = $element.find(event.target).length > 0;
          if(!isChild) {
            $scope.$apply(scopeExpression);
          }
        };

      $document.on("click", onDocumentClick);

      $element.on('$destroy', function() {
        $document.off("click", onDocumentClick);
      });
    }
  }
}]);
