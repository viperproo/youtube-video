var input, video_overlay, interval, player, current_time, duration, difference;

function hideOverlay() {
  video_overlay.removeClass('visible');
  video_overlay.html(0);
}

function onYouTubeIframeAPIReady() {
  $('.send-button')[0].disabled = false;
}

function onPlayerReady(event) {
  duration = player.getDuration();
  event.target.playVideo();}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    interval = setInterval(function () {
      current_time = player.getCurrentTime();
      difference = parseInt(duration) - parseInt(current_time);
      if (difference <= 10 && difference > 0) {
        video_overlay.html(difference);
        video_overlay.addClass('visible');
      } else {
        hideOverlay();
      }
    }, 50);
  } else {
    clearInterval(interval);
    hideOverlay();
  }
}

function stopVideo() {
  player.stopVideo();
}

$(document).ready(function () {
  input = $('input');
  video_overlay = $('.video-overlay');

  $('.send-button').on('click', function () {
    $('#player').after('<div id="player"></div>').remove();
    clearInterval(interval);
    hideOverlay();
    player = new YT.Player('player', {
      width: '1280',
      height: '720',
      videoId: input.val(),
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  });

});