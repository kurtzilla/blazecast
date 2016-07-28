
// STRETCH allow multiple sources in a queue
app.service('mediaPlayerService', function($sce, $window){
  this.sourceQueue = [];

  // videogular only uses src and type attribs - normalize episode to source
  this.convertEpisodeToSource = function(episode){
    var source = {};
    source.src = $sce.trustAsResourceUrl(episode.audio_url);
    source.type = episode.type;
    return source;
  };

  this.addEpisodeToPlayer = function(episode){
    console.log('THIS?', episode);
    this.sourceQueue = [this.convertEpisodeToSource(episode)];
  };
});
