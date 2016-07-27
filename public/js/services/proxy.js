
app.service('proxyService', function(){
  this.proxyResource = function(url){
    var encoded = btoa(url);
    return '/proxyresource/' + encoded;
  }
});