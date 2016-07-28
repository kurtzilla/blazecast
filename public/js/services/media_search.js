
// TODO make limit configurable
app.factory('Media', function($resource) {
  return $resource(
    'https://itunes.apple.com/search?' +
    'media=podcast&entity=podcastAuthor&entity=podcast&term=:query',
    { query: '@query' },
    {
      search: {
        method: 'JSONP',
        params: {
          limit: 104,
          callback: 'JSON_CALLBACK'
        }
      }
    }
  );
});
