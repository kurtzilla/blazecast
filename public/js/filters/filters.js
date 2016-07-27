
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
    var encoded = btoa(input);
    return '/proxyresource/' + encoded;
  }
});
