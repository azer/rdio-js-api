## rdio-js-api

CommonJS Wrapper for Rdio JavaScript API.

```js
rdio = require('rdio-js-api')('api-key-here', 'auth.html')

rdio.play('artist/Daft_Punk/album/Random_Access_Memories/track/Give_Life_Back_to_Music')
```

## Install

```bash
$ npm install rdio-js-api
```

## API

### rdio(`api-key`, `path/to/auth.html`, `callback`)

```js
rdio = require('rdio-api')('api-key-here', 'path/to/auth.html')
```

#### .play(`url`, `callback`)

```js
rdio.play('artist/Daft_Punk/album/Random_Access_Memories/track/Give_Life_Back_to_Music', function () {
  // playing
})
```

#### .playFromKey(`key`)
#### .pause(`song-key`)
#### .onPlay(`callback`)
#### .onPause(`callback`)
#### .onEnd(`callback`)

#### .onPlayStateChange(`callback`)

```js
rdio.onPlayStateChange(function(){
  rdio.state().playing
  // => true/false
})
```

#### request(`method`, `options`, `callback`)

```js
rdio.request('getObjectFromUrl', { url: url }, function (error, track) {
  rdio.playFromKey(track.key)
})
```

#### .state() => object
#### .isPaused() => boolean
#### .isPlaying() => boolean
#### .isStopped() => boolean
#### .ready(`callback`)
#### .sdk(`callback`)

Loads the original Rdio SDK.

```js
rdio.sdk(function (error, sdk) {
  sdk.ready(function () {
    sdk.play({ source: key })
  })
})
```

## Testing

Clone the repo first, and make sure you have all dependencies installed:

```bash
$ npm install
```

And run tests by calling the `npm test` command:

```bash
$ npm test
```

This will start publishing the tests on `:7559`. Visit `localhost:7559` to run the tests in a browser. 
