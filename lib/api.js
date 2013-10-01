var events = require("./events");
var sdk = require('./init').sdk;
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
  var args = arguments;
  ready(function (error, rdio) {
    if (typeof args[0] != 'string') {
      return rdio.player.play();
    }

    request('getObjectFromUrl', { url: url }, function (error, response) {
      playFromKey(response.key, callback);
    });
  });
}

function playFromKey (key, callback) {
  ready(function(error, rdio) {
    rdio.player.play({ source: key  });
    callback && callback();
  });
}

function pause () {
  ready(function (error, rdio) {
    rdio.player.pause();
  });
}

function request (method, options, callback) {
  ready(function (error, rdio) {
    rdio.request({
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
  sdk(function (error, rdio) {
    if (error) throw error;

    rdio.ready(function () {
      if (!ready.called) {
        ready.called = true;
        rdio.player.on('change:playState', events.publishUpdate);
      }

      callback(undefined, rdio);
    });
  });
}
