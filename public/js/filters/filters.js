
app.filter('removeProtocol', function($location) {
  return function (input) {
    if(input){
      return input.replace(/^http:\/\//g, '')
                  .replace(/^https:\/\//g, '');
    }
  }
});

app.filter('proxyResource', function(){
  return function(input){
    var encoded = btoa(input);
    return '/proxyresource/' + encoded;
  }
});


// TBA - robk
app.filter('formatProtocol', ['$location', function($location){
   return function(input){

     return input;
  //
  // HOST
  //    https://blazecast.heroku.com

     // if(input){
     //
     //   var inp = input.replace(/^http:\/\//g, '//')
     //      .replace(/^https:\/\//g, '//');
     //
     //   return inp;
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
     //}
  };
}]);
