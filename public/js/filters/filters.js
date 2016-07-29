
app.filter('removeProtocol', function() {
  return function (input) {
    if(input){
      return input.replace(/^http:\/\//g,   '')
                  .replace(/^https:\/\//g,  '');
    }
  }
});

app.filter('proxyResource', function(){
  return function(input){
    return input;
    
    if(input) {
      var encoded = btoa(input);
      return '/proxyresource/' + encoded;
    }
  }
});

app.filter('substringLongTitle', function(){
  return function(input) {
    if (input) {
      var len = 50;// this is 0 based!!!
      var inp = input.trim();
      if (inp.length > len) {
        inp = inp.substr(0, len) + '...';
      }
      return inp;
    }
  }
});
