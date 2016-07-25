app.service('rssFeed', function($http, $q){

  this.$http = $http;
  this.$q = $q;

  this.formatProtocol = function(link, desiredProtocol){
    return link.replace(/^http:\/\//g, desiredProtocol + '://')
      .replace(/^https:\/\//g, desiredProtocol + '://');
  };

  this.loadFeed = function(url){
    var deferral = this.$q.defer();

    this.$http.jsonp('https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&q=' +
      url + '&callback=JSON_CALLBACK')
    .then(function(response){
      // console.log('RESPONSE', response);
      if(response && response.data && response.data.responseData && response.data.responseData.feed){
        deferral.resolve(response.data.responseData.feed);
      } else {
        deferral.reject('no response information');
      }
    })
    .catch(function(err){
      deferral.reject(err);
    });
    return deferral.promise;
  };
});
