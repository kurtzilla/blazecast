app.filter('formatProtocol', ['$location', function($location){
   return function(input){
     if(input){

       return input.replace(/^http:\/\//g, '//')
          .replace(/^https:\/\//g, '//');
      //
      //  var currentProtocol = $location.$$protocol;
      //  var inp = '';
      //
      //  if(currentProtocol === "https" && input.toLowerCase().indexOf('http:') !== -1){
      //    inp = input.replace(/^http:\/\//g, currentProtocol + '://')
      //  } else {
      //    inp = input;
      //  }
      //
      // //  var inp = input.replace(/^http:\/\//g, currentProtocol + '://')
      // //    .replace(/^https:\/\//g, currentProtocol + '://');
      //  return inp;
     }
  };
}]);
