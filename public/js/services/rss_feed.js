app.service('rssFeed', function($http, $q){

  this.$http = $http;
  this.$q = $q;

  this.loadFeed = function(url){
    var deferral = this.$q.defer();

    this.$http.jsonp('https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&q=' +
      url + '&callback=JSON_CALLBACK')
    .then(function(response){
      deferral.resolve(response.data.responseData.feed);
    })
    .catch(function(err){
      deferral.reject(err);
    });
    return deferral.promise;
  };
});
