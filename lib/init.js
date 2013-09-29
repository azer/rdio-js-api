var format = require("new-format");
var loadScript = require("load-script");
var sdkLoadQueue = require("pubsub")();
var isSDKLoading;
var isSDKLoaded;
var sdkURL;

module.exports = init;
module.exports.loadSDK = loadSDK;

function init (id, authPath, callback) {
  sdkURL = format('//www.rdio.com/api/api.js?helper={1}&client_id={0}',id, authPath);
  loadSDK(callback);
}

function loadSDK (callback) {
  if (isSDKLoaded) return callback();

  sdkLoadQueue(callback);

  if (isSDKLoading) return;
  isSDKLoading = true;

  loadScript(sdkURL, function (error) {
    if (error) throw error;
    isSDKLoaded = true;
    sdkLoadQueue.publish();
  });
}
