app.filter('formatProtocol', ['$location', function($location){
   return function(input){
     if(input){
       var currentProtocol = $location.$$protocol;
      //  console.log('PPP',currentProtocol, input);
       return input.replace(/^http:\/\//g, currentProtocol + '://')
         .replace(/^https:\/\//g, currentProtocol + '://');
     }
  };
}]);
