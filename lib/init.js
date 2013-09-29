var format = require("new-format");
var loadScript = require("load-script");

module.exports = init;

function init (id, authPath, callback) {
  loadAPI(id, authPath, callback);
}

function loadAPI (id, authPath, callback) {
  var url = format('//www.rdio.com/api/api.js?helper={1}&client_id={0}',id, authPath);
  loadScript(url, callback);
}
