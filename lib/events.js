var pubsub = require("pubsub");
var state = require('./state');
var last;

module.exports = {
  onPlayStateChange: pubsub(),
  onPlay: pubsub(),
  onEnd: pubsub(),
  onPause: pubsub(),
  publishUpdate: publishUpdate
};

function publishUpdate () {
  var now = state();

  setTimeout(function () {
    last = now;
  }, 0);

  if (now.stopped && (last &&  last.playing)) {
    module.exports.onEnd.publish();
  }

  if (now.paused) {
    module.exports.onPause.publish();
  }

  if (now.playing) {
    module.exports.onPlay.publish();
  }
}
