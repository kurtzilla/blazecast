app.filter('formatProtocol', ['$location', function($location){
   return function(input){
     if(input){
       var currentProtocol = $location.$$protocol;
       var inp = '';

       if(currentProtocol === "https" && input.toLowerCase().indexOf('http:') !== -1){
         inp = input.replace(/^http:\/\//g, currentProtocol + '://')
       } else {
         inp = input;
       }

      //  console.log('PPP',currentProtocol, input);
      //  var inp = input.replace(/^http:\/\//g, currentProtocol + '://')
      //    .replace(/^https:\/\//g, currentProtocol + '://');
       return inp;
     }
  };
}]);
