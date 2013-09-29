var api = require('../');
var rdio;

before(function(done){
  rdio = api('3hHANmSYxWw_IiOquHkQ9g', '/src/test/auth.html', done);
});

it('plays and pauses a song', function(done){
  rdio.ready(function () {
    rdio.play('artist/Jose_Larralde/album/Rio_Arriba/track/Quimey_Neuquen_(Chancha_Via_Circuito_Remix)');
  });

  var played;

  rdio.onPlayStateChange(function () {

    if (rdio.isPlaying()) {
      played = true;
      rdio.pause();
    }

    if (rdio.isPaused()) {
      expect(played).to.be.true;
      done();
    }
  });
});
