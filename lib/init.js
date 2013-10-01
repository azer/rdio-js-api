var format = require("new-format");
var requireSDK = require("require-sdk");
var sdk;

module.exports = init;
module.exports.sdk = getSDK;

function getSDK () {
  return sdk.apply(undefined, arguments);
}

function init (id, authPath, callback) {
  var url = format('//www.rdio.com/api/api.js?helper={1}&client_id={0}', id, authPath);
  sdk = requireSDK(url, 'R');
  sdk();
}
