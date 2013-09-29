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

#### .play(`url`)

```js
rdio.play('artist/Daft_Punk/album/Random_Access_Memories/track/Give_Life_Back_to_Music')
```

#### .playFromKey(`key`)

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

![](https://i.cloudup.com/Lv6QOy2i87.jpg)
