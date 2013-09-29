module.exports = state;

function state () {
  var state = R.player.playState();

  return {
    playing: state == R.player.PLAYSTATE_PLAYING,
    paused: state == R.player.PLAYSTATE_PAUSED,
    stopped: state == R.player.PLAYSTATE_STOPPED
  };
}
