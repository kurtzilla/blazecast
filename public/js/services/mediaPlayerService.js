
// TODO allow multiple sources in a queue
app.service('mediaPlayerService', function($sce, $window){
  this.sourceQueue = [];

  // videogular only uses src and type attribs
  this.convertEpisodeToSource = function(episode){
    var source = {};
    source.src = $sce.trustAsResourceUrl(episode.url);
    // source.src = episode.url;
    source.type = episode.type;
    // console.log('SOURCE',source);
    return source;
  };

  this.addEpisodeToPlayer = function(episode){
    // console.log('THIS?', episode);
    // TODO set attribute on player for title?
    this.sourceQueue = [this.convertEpisodeToSource(episode)];
    // console.log(this.sourceQueue);
  };
});
