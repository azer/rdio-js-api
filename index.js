var init = require('./lib/init'),
    api = require("./lib/api");

module.exports = rdio;

function rdio (id, authPath) {
  init(id, authPath);
  return api;
}
