var request = require('request');
var atob = require('atob');

exports.proxyResource = function(req, res, next) {
  // decode
  var decodedString = atob(req.params.resourceurl);
  // send it back as a stream
  // console.log('PXY API atob', decodedString, req.params.resourceurl);
  request(decodedString).pipe(res);
};
