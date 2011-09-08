/*!
 * GAS - Google Analytics on Steroids
 * Video Tracking plugin
 *
 * Supports Vimeo and Youtube
 *
 * Copyright 2011, Cardinal Path
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 * @version $Revision$
 *
 * $Date$
 */


function postMessage(method, params, target) {
    if (!target.contentWindow.postMessage) {
        return false;
    }
    var url = target.getAttribute('src').split('?')[0],
        data = JSON.stringify({
            method: method,
            value: params
        });
    target.contentWindow.postMessage(data, url);
}

var _has_vimeo_window_event = false;
function _trackVimeo() {
    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0; i < iframes.length; i++) {
        if (sindexOf.call(iframes[i].src, '//player.vimeo.com') > -1) {
            postMessage('addEventListener', 'play', iframes[i]);
            postMessage('addEventListener', 'pause', iframes[i]);
            postMessage('addEventListener', 'finish', iframes[i]);
        }
    }
    if (_has_vimeo_window_event === false) {
        this._addEventListener(window, 'message', function(event) {
            if (sindexOf.call(event.origin, '//player.vimeo.com') > -1) {
                var data = JSON.parse(event.data);
                if (data.event === 'ready') {
                    _trackVimeo(); // Force rerun since a player is ready
                }else {
                    _gas.push(['_trackEvent', 'Vimeo Video',
                        data.event, data.player_id]);
                }
            }

        }, false);
        _has_vimeo_window_event = true;
    }
}

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

function _trackYoutube() {
    var youtube_videos = [];
    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0; i < iframes.length; i++) {
        if (sindexOf.call(iframes[i].src, '//www.youtube.com/embed') > -1) {
            youtube_videos.push(iframes[i]);
        }
    }
    if (youtube_videos.length > 0) {
        window.onYouTubePlayerAPIReady = function() {
            var p;
            for (var i = 0; i < youtube_videos.length; i++) {
                p = new YT.Player(youtube_videos[i]);
                p.addEventListener('onStateChange', _ytStateChange);
                p.addEventListener('onError', _ytError);
            }
        };
        var tag = document.createElement('script');
        tag.src = 'http://www.youtube.com/player_api';
        tag.type = 'text/javascript';
        tag.async = true;
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}

window._gas.push(['_addHook', '_trackVimeo', function() {
    _trackVimeo.call(this);
}]);

window._gas.push(['_addHook', '_trackYoutube', function() {
    _trackYoutube.call(this);
}]);

window._gas.push(['_addHook', '_trackVideo', function() {
    _trackVimeo.call(this);
    _trackYoutube.call(this);
}]);

