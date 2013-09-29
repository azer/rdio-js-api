var events = require("./events");

module.exports = {
  onPlayStateChange: events.onPlayStateChange,
  isPlaying: isPlaying,
  isStopped: isStopped,
  isPaused: isPaused,
  pause: pause,
  play: play,
  ready: ready,
  state: state
};

function isStopped () {
  return state().stopped;
}

function isPaused () {
  return state().paused;
}

function isPlaying () {
  return state().playing;
}
function play (key, callback) {
  ready(function() {
    R.player.play({ source: key  });
    callback && callback();
  });
}

function pause () {
  R.player.pause();
}

function ready (callback) {
  R.ready(function () {
    if (!ready.called) {
      ready.called = true;
      R.player.on('change:playState', events.onPlayStateChange.publish);
    }

    callback();
  });
}

function state () {
  var state = R.player.playState();
  return {
    playing: state == R.player.PLAYSTATE_PLAYING,
    paused: state == R.player.PLAYSTATE_PAUSED,
    stopped: state == R.player.PLAYSTATE_STOPPED
  };
}