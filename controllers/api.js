// var config = require('../knexfile');
// var knex = require('../db/knex');//(config);
// var bookshelf = app.get('bookshelf');

/* This portion of the api will only return non-sensitive key values */
//
exports.testApi = function(req, res) {
  console.log('REQ', req.body);
//
//   res.json(200,'testing API');
//   // return knex.destroy()
//   // .then(function(data){
//   //   return bookshelf.knex('users').select('*').first()
//   //
//   // .then(function(data){
//   //   res.json(200,'testing API', data);
//   // });
}

/**
 * GET /contact
 */
// exports.apiEnvKey = function(req, res) {
//   // TODO add security!!!!s
//   var environment = {};
//   var key = req.params.key;
//
//   if(key === 'all'){
//     environment.FACEBOOK_ID = process.env.FACEBOOK_ID;
//     environment.TWITTER_KEY = process.env.TWITTER_KEY;
//     environment.GOOGLE_ID = process.env.GOOGLE_ID;
//     environment.HOST = process.env.HOST;
//   }
//
//   res.json(environment);
// };
