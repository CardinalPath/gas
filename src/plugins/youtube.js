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
 * Array of percentage to fire events.
 *
 */
var timeTriggers = [];


/**
 * Used to map each vid to a set of timeTriggers and it's pool timer
 */
var poolMaps = {};


function _ytStartPool(target) {
    if (timeTriggers && timeTriggers.length) {
        var h = target['getVideoData']()['video_id'];
        if (poolMaps[h]) {
            _ytStopPool(target);
        }else {
            poolMaps[h] = {};
            poolMaps[h].timeTriggers = slice.call(timeTriggers);
        }
        poolMaps[h].timer = setTimeout(_ytPool, 1000, target, h);
    }
}

function _ytPool(target, hash) {
    if (poolMaps[hash] == undefined ||
        poolMaps[hash].timeTriggers.length <= 0) {
        return false;
    }
    var p = target['getCurrentTime']() / target['getDuration']() * 100;
    if (p >= poolMaps[hash].timeTriggers[0]) {
        var action = poolMaps[hash].timeTriggers.shift();
        _gas.push([
            '_trackEvent',
            'YouTube Video',
            action + '%',
            target['getVideoUrl']()
        ]);
    }
    poolMaps[hash].timer = setTimeout(_ytPool, 1000, target, hash);
}

function _ytStopPool(target) {
    var h = target['getVideoData']()['video_id'];
    if (poolMaps[h] && poolMaps[h].timer) {
        _ytPool(target, h); // Pool one last time before clearing it.
        clearTimeout(poolMaps[h].timer);
    }
}

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
            _ytStopPool(event['target']);
            break;
        case 1:
            action = 'play';
            _ytStartPool(event['target']);
            break;
        case 2:
            action = 'pause';
            _ytStopPool(event['target']);
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
 * @param {Array} opt_timeTriggers Array of integers from 0 to 100 that define
 * the steps to fire an event. eg: [25, 50, 75, 90].
 */
function _trackYoutube(force, opt_timeTriggers) {
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
                    continue;
                }
            }
            youtube_videos.push(iframes[i]);
        }
    }
    if (youtube_videos.length > 0) {
        if (opt_timeTriggers && opt_timeTriggers.length) {
            timeTriggers = opt_timeTriggers;
        }
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

_gas.push(['_addHook', '_trackYoutube', function() {
    var args = slice.call(arguments);
    var gh = this;
    gh._DOMReady(function() {
        _trackYoutube.apply(gh, args);
    });
    return false;
}]);

