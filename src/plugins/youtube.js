/*!
 * GAS - Google Analytics on Steroids
 * YouTube embedded Video Tracking plugin
 *
 *
 * Copyright 2011, Cardinal Path
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 * @version $Revision$
 *
 * $Date$
 */

function _ytStateChange(event) {
    var action = '';
    switch (event.data) {
        case YT.PlayerState.ENDED:
            action = 'finish';
            break;
        case YT.PlayerState.PLAYING:
            action = 'play';
            break;
        case YT.PlayerState.PAUSED:
            action = 'pause';
            break;
    }
    if (action) {
        _gas.push(['_trackEvent',
            'YouTube Video', action, event.target.getVideoUrl()
        ]);
    }
}

function _ytError(event) {
    _gas.push(['_trackEvent', 'YouTube Video', 'error', event.data]);
}

function _trackYoutube(force) {
    var youtube_videos = [];
    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0; i < iframes.length; i++) {
        if (sindexOf.call(iframes[i].src, '//www.youtube.com/embed') > -1) {
            if (sindexOf.call(iframes[i].src, 'enablejsapi=1') < 0) {
                if (force) {
                    // Reload the video enabling the api
                    if (sindexOf.call(iframes[i].src, '?') < 0) {
                        iframes[i].src += '?enablejsapi=1';
                    }else {
                        iframes[i].src += '&enablejsapi=1';
                    }
                }else {
                    // We can't track players that don't have api enabled.
                    break;
                }
            }
            youtube_videos.push(iframes[i]);
        }
    }
    if (youtube_videos.length > 0) {
        // this function will be called when the youtube api loads
        window.onYouTubePlayerAPIReady = function() {
            var p;
            for (var i = 0; i < youtube_videos.length; i++) {
                p = new YT.Player(youtube_videos[i]);
                p.addEventListener('onStateChange', _ytStateChange);
                p.addEventListener('onError', _ytError);
            }
        };
        // load the youtube player api
        var tag = document.createElement('script');
        tag.src = 'http://www.youtube.com/player_api';
        tag.type = 'text/javascript';
        tag.async = true;
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}

window._gas.push(['_addHook', '_trackYoutube', function(force) {
    _trackYoutube.call(this, force);
    return false;
}]);

