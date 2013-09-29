## rdio-js-api

CommonJS Wrapper for Rdio JavaScript API.

```js
rdio = require('rdio-js-api')('api-key-here', 'auth.html')

rdio.play('a3032151')
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

#### .play(`song-key`)

```js
rdio.play('a3032151')
```

#### .pause(`song-key`)

```js
rdio.pause()
```

#### .onPlayStateChange(`callback`)

```js
rdio.onPlayStateChange(function(){
  rdio.state().playing
  // => true/false
})
```

#### .state() => object
#### .isPaused() => boolean
#### .isPlaying() => boolean
