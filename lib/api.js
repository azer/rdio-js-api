var events = require("./events");
var loadSDK = require('./init').loadSDK;
var state = require('./state');

module.exports = {
  onPlay: events.onPlay,
  onPause: events.onPause,
  onEnd: events.onEnd,
  onPlayStateChange: events.onPlayStateChange,
  isPlaying: isPlaying,
  isStopped: isStopped,
  isPaused: isPaused,
  pause: pause,
  play: play,
  playFromKey: playFromKey,
  ready: ready,
  request: request,
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

function play (url, callback) {
  if (typeof arguments[0] != 'string') {
    return R.player.play();
  }

  request('getObjectFromUrl', { url: url }, function (error, response) {
    playFromKey(response.key, callback);
  });
}

function playFromKey (key, callback) {
  ready(function() {
    R.player.play({ source: key  });
    callback && callback();
  });
}

function pause () {
  ready(function () {
    R.player.pause();
  });
}

function request (method, options, callback) {
  ready(function () {
    R.request({
      method: method,
      content: options,
      success: onSuccess,
      error: onError
    });
  });

  function onSuccess (response) {
    callback(undefined, response.result);
  }

  function onError (response) {
    callback(response);
  }
}

function ready (callback) {
  loadSDK(function () {
    R.ready(function () {

      if (!ready.called) {
        ready.called = true;
        R.player.on('change:playState', events.publishUpdate);
      }

      callback();
    });
  });
}
