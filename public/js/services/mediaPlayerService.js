
// TODO allow multiple sources in a queue
app.service('mediaPlayerService', function($sce, $window){
  this.sourceQueue = [];

  // videogular only uses src and type attribs
  this.convertEpisodeToSource = function(episode){
    var source = {};
    source.src = $sce.trustAsResourceUrl(episode.url);
    source.type = episode.type;
    return source;
  };

  this.addEpisodeToPlayer = function(episode){
    // console.log('THIS?', episode);
    // var title = episode.title;
    // console.log('Add Selection', episode);
    // ang_element = angular.element(element);

    // pause if running

    // this.sourceQueue = [];
    this.sourceQueue = [this.convertEpisodeToSource(episode)];

    // TODO set attribute on player for title?
    // console.log(this.sourceQueue);
    // notify player - or player sets watch? see directives/itunes_search.js
  };
});


// this.config = {
//   sources: [
//     {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/audios/videogular.mp3"),
//       type: "audio/mpeg"},
//     {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/audios/videogular.ogg"),
//       type: "audio/ogg"}
//     ]
