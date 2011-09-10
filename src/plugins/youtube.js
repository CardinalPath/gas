/**
 * GAS - Google Analytics on Steroids
 *
 * YouTube Video Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * Called when the Video State changes
 *
 * We are currently tracking only finish, play and pause events
 *
 * @param {Object} event the event passed by the YT api.
 */
function _ytStateChange(event) {
    var action = '';
    switch (event['data']) {
        case 0:
            action = 'finish';
            break;
        case 1:
            action = 'play';
            break;
        case 2:
            action = 'pause';
            break;
    }
    if (action) {
        _gas.push(['_trackEvent',
            'YouTube Video', action, event['target']['getVideoUrl']()
        ]);
    }
}

/**
 * Called when the player fires an Error Event
 *
 * @param {Object} event the event passed by the YT api.
 */
function _ytError(event) {
    _gas.push(['_trackEvent',
        'YouTube Video',
        'error (' + event['data'] + ')',
        event['target']['getVideoUrl']()
    ]);
}

/**
 * Triggers the YouTube Tracking on the page
 *
 * Only works for the iframe tag. The video must have the parameter
 * enablejsapi=1 on the url in order to make the tracking work.
 *
 * @param {(string|boolean)} force evaluates to true if we should force the
 * enablejsapi=1 parameter on the url to activate the api. May cause the player
 * to reload.
 */
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
        window['onYouTubePlayerAPIReady'] = function() {
            var p;
            for (var i = 0; i < youtube_videos.length; i++) {
                p = new window['YT']['Player'](youtube_videos[i]);
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

_gas.push(['_addHook', '_trackYoutube', function(force) {
    var gh = this;
    gh._DOMReady(function(){
        _trackYoutube.call(gh, force);
    });
    return false;
}]);

