app.service('rssFeed', function($http, $q){

  this.$http = $http;
  this.$q = $q;

  this.loadFeed = function(url){
    var deferral = this.$q.defer();

    // TODO make num configurable
    this.$http.jsonp('https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&q=' +
      url + '&callback=JSON_CALLBACK')
    .then(function(response){

      console.log('Res DATA', response.data.responseData);



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

/*
<script src="https://cdnjs.cloudflare.com/ajax/libs/x2js/1.2.0/xml2json.min.js"></script>

app.controller('myController', myController);

function myController($scope, $http) {
  $scope.view = {};
  var corsCheat = 'https://crossorigin.me/';
  $scope.search = function(term) {
    $http.get(corsCheat + 'https://itunes.apple.com/search?term=' + term + '&media=podcast')
      .then(search2);
  };
​
​
    function search2(data) {
      console.log('itunes response', data);
      var feedUrl = data.data.results[0].feedUrl;
      $http.get(corsCheat + feedUrl)
        .then(function(data) {
          console.log('feed response:', data);
          var xmlString = data.data;
          var x2js = new X2JS();
          var jsonObj = x2js.xml_str2json(data.data);
          console.log('jsonObj:', jsonObj);
          var episodes = jsonObj.rss.channel.item;
          for (var episode of episodes) {
            console.log(episode);
          }
        });
    }
};
myController.$inject = ['$scope', '$http'];
*/