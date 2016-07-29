
app.service('proxyService', function(){
  this.proxyResource = function(url){
    var encoded = btoa(url);
    console.log('PXY SVC btoa', url, encoded);
    return '/proxyresource/' + encoded;
  }
});