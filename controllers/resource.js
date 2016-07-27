require('dotenv').config();
var request = require('request');
var atob = require('atob');


exports.proxyResource = function(req, res, next) {
  console.log('RESOURCE ROUTE');
  var url = req.params.resourceurl;
  // decode
  var decodedString = atob(url);

  console.log('DECODED', decodedString);

  // send it back as a stream
  request(decodedString).pipe(res);
};
