
// STRETCH allow multiple sources in a queue
app.service('mediaPlayerService', function($sce){
  this.sourceQueue = [];
  this.episodeTitle = '';
  this.podcastTitle = '';

  // this.currentPlayState = true;
  // this.haltPlayer = function(){
  //   return this.currentPlayState;
  // };

  // videogular only uses src and type attribs - normalize episode to source
  this.convertEpisodeToSource = function(episode){
    var source = {};
    source.src = $sce.trustAsResourceUrl(episode.audio_url);
    source.type = episode.type;
    return source;
  };

  this.addEpisodeToPlayer = function(episode){
    // console.log('THIS?', episode);
    // this.currentPlayState = false;

    this.sourceQueue = [this.convertEpisodeToSource(episode)];
    this.episodeTitle = episode.title;
    this.podcastTitle = episode.show_title;
    // this.currentPlayState = true;
  };
});
