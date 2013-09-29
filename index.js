var init = require('./lib/init'),
    api = require("./lib/api");

module.exports = rdio;

function rdio (id, authPath, callback) {
  init(id, authPath, callback);
  return api;
}
