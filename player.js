function play_stream(url) {
  var video = document.getElementById('video');
  var m3u8Url = decodeURIComponent(url);

  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(m3u8Url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play();
    });
    history.pushState({}, null, "/");
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = m3u8Url;
    video.addEventListener('loadedmetadata', function () {
      video.play();
    });
    history.pushState({}, null, "/");
  }
}

var url = window.location.href.split("#")[1];
play_stream(url);