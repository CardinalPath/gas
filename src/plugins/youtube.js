/**
 * GAS - Google Analytics on Steroids
 *
 * YouTube Video Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * Array of percentage to fire events.
 */
var _ytTimeTriggers = [];
var _ytOpts;


/**
 * Used to map each vid to a set of timeTriggers and it's pool timer
 */
var _ytPoolMaps = {};

function _ytPool(target, hash) {
    if (_ytPoolMaps[hash] === undefined ||
        _ytPoolMaps[hash].timeTriggers.length <= 0) {
        return false;
    }
    var p = target['getCurrentTime']() / target['getDuration']() * 100;
    if (p >= _ytPoolMaps[hash].timeTriggers[0]) {
        var action = _ytPoolMaps[hash].timeTriggers.shift();
        _gas.push([
            '_trackEvent',
            _ytOpts['category'],
            action + '%',
            target['getVideoUrl']()
        ]);
    }
    _ytPoolMaps[hash].timer = setTimeout(_ytPool, 1000, target, hash);
}

function _ytStopPool(target) {
    var h = target['getVideoUrl']();
    if (_ytPoolMaps[h] && _ytPoolMaps[h].timer) {
        _ytPool(target, h); // Pool one last time before clearing it.
        clearTimeout(_ytPoolMaps[h].timer);
    }
}

function _ytStartPool(target) {
    if (_ytTimeTriggers && _ytTimeTriggers.length) {
        var h = target['getVideoUrl']();
        if (_ytPoolMaps[h]) {
            _ytStopPool(target);
        } else {
            _ytPoolMaps[h] = {};
            _ytPoolMaps[h].timeTriggers = slice.call(_ytTimeTriggers);
        }
        _ytPoolMaps[h].timer = setTimeout(_ytPool, 1000, target, h);
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
            _ytOpts['category'], action, event['target']['getVideoUrl']()
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
        _ytOpts['category'],
        'error (' + event['data'] + ')',
        event['target']['getVideoUrl']()
    ]);
}

/**
 * Looks for object/embed youtube videos and migrate them to the iframe method
 *  so it tries to track them
 */
function _ytMigrateObjectEmbed() {
    var objs = document.getElementsByTagName('object');
    var pars, ifr, ytid;
    var r = /(https?:\/\/www\.youtube(-nocookie)?\.com[^\/]*).*\/v\/([^&?]+)/;
    for (var i = 0; i < objs.length; i++) {
        pars = objs[i].getElementsByTagName('param');
        for (var j = 0; j < pars.length; j++) {
            if (pars[j].name === 'movie' && pars[j].value) {
                // Replace the object with an iframe
                ytid = pars[j].value.match(r);
                if (ytid && ytid[1] && ytid[3]) {
                    ifr = document.createElement('iframe');
                    ifr.src = ytid[1] + '/embed/' + ytid[3] + '?enablejsapi=1';
                    ifr.width = objs[i].width;
                    ifr.height = objs[i].height;
                    ifr.setAttribute('frameBorder', '0');
                    ifr.setAttribute('allowfullscreen', '');
                    objs[i].parentNode.insertBefore(ifr, objs[i]);
                    objs[i].parentNode.removeChild(objs[i]);
                    // Since we removed the object the Array changed
                    i--;
                }
                break;
            }
        }
    }
}

/**
 * Triggers the YouTube Tracking on the page
 *
 * Only works for the iframe tag. The video must have the parameter
 * enablejsapi=1 on the url in order to make the tracking work.
 *
 * @param {(object)} opts GAS Options object.
 */
function _trackYoutube(opts) {
    var force = opts['force'];
    var opt_timeTriggers = opts['percentages'];
    if (force) {
        try {
            _ytMigrateObjectEmbed();
        }catch (e) {
            _gas.push(['_trackException', e,
                'GAS Error on youtube.js:_ytMigrateObjectEmbed'
            ]);
        }
    }

    var youtube_videos = [];
    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0; i < iframes.length; i++) {
        if (sindexOf.call(iframes[i].src, '//www.youtube.com/embed') > -1) {
            if (sindexOf.call(iframes[i].src, 'enablejsapi=1') < 0) {
                if (force) {
                    // Reload the video enabling the api
                    if (sindexOf.call(iframes[i].src, '?') < 0) {
                        iframes[i].src += '?enablejsapi=1';
                    } else {
                        iframes[i].src += '&enablejsapi=1';
                    }
                } else {
                    // We can't track players that don't have api enabled.
                    continue;
                }
            }
            youtube_videos.push(iframes[i]);
        }
    }
    if (youtube_videos.length > 0) {
        if (opt_timeTriggers && opt_timeTriggers.length) {
            _ytTimeTriggers = opt_timeTriggers;
        }
        // this function will be called when the youtube api loads
        window['onYouTubePlayerAPIReady'] = function () {
            var p;
            for (var i = 0; i < youtube_videos.length; i++) {
                p = new window['YT']['Player'](youtube_videos[i]);
                p.addEventListener('onStateChange', _ytStateChange);
                p.addEventListener('onError', _ytError);
            }
        };
        // load the youtube player api
        var tag = document.createElement('script');
        //XXX use document.location.protocol
        var protocol = 'http:';
        if (document.location.protocol === 'https:') {
            protocol = 'https:';
        }
        tag.src = protocol + '//www.youtube.com/player_api';
        tag.type = 'text/javascript';
        tag.async = true;
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}

var _gasTrackYoutube = function (opts) {
    // Support for legacy parameters
    var args = slice.call(arguments);
    if (args[0] && (typeof args[0] === 'boolean' || args[0] === 'force')) {
        opts = {'force': !!args[0]};
        if (args[1] && args[1].length) {
            opts['percentages'] = args[1];
        }
    }

    opts = opts || {};
    opts['force'] = opts['force'] || false;
    opts['category'] = opts['category'] || 'YouTube Video';
    opts['percentages'] = opts['percentages'] || [];

    _ytOpts = opts;
    var gh = this;
    gh._DOMReady(function () {
        _trackYoutube.call(gh, opts);
    });
    return false;
};

_gas.push(['_addHook', '_gasTrackYoutube', _gasTrackYoutube]);

// Old API to be deprecated on v2.0
_gas.push(['_addHook', '_trackYoutube', _gasTrackYoutube]);

