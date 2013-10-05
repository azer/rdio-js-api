var api = require('../');
var rdio;

before(function(done){
  rdio = api('3hHANmSYxWw_IiOquHkQ9g', '/src/test/auth.html');
  done();
});

beforeEach(function () {
  rdio.onPlay.subscribers.splice(0, 999);
  rdio.onEnd.subscribers.splice(0, 999);
  rdio.onPause.subscribers.splice(0, 999);
});

it('has a reference to original sdk', function(done){
  rdio.sdk(function (error, sdk) {
    expect(error).to.not.exist;
    expect(sdk).to.equal(R);
    done();
  });
});

it('plays and pauses a song', function(done){
  rdio.play('/artist/Tech_N9ne/album/Something_Else_(All_Access_Edition)/track/R.I.P._Ray_(Skit)/');

  var played;
  var paused;

  rdio.onPlay(function () {
    if (paused) return;

    played = true;
    setTimeout(rdio.pause, 1000);
  });

  rdio.onPause(function () {
    paused = true;
    expect(played).to.be.true;
    setTimeout(rdio.play, 1000);
  });

  rdio.onEnd(function () {
    expect(played).to.be.true;
    expect(paused).to.be.true;
    done();
  });
});

it('plays three different tracks', function(done){

  var tracks = [
    'http://www.rdio.com/artist/Fall_Out_Boy/album/Save_Rock_And_Roll/track/The_Phoenix/',
    'http://www.rdio.com/artist/The_Chemical_Brothers/album/Push_The_Button/track/Galvanize/',
    'http://www.rdio.com/artist/Tech_N9ne/album/The_Box_Set/track/Dysfunctional/'
  ];

  var index = 0;
  var stopped;

  rdio.onPlay(function () {
    if (index == 2) {
      stopped = true;

      setTimeout(function () {
        rdio.pause();
        done();
      }, 2000);
      return;
    }

    setTimeout(function () {
      rdio.pause();
      rdio.play(tracks[++index]);
    }, 2000);
  });

  rdio.play(tracks[index]);

});
