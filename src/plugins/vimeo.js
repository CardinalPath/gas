/**
 * GAS - Google Analytics on Steroids
 *
 * Vimeo Video Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

var _vimeoTimeTriggers = [];
var _vimeoPoolMaps = {};

/**
 * Cached urls for vimeo players on the page.
 *
 * @type {object}
 */
var _vimeo_urls = {};

function _vimeoPool(data) {
    if (!_vimeoPoolMaps[data.player_id]) {
        _vimeoPoolMaps[data.player_id] = {};
        _vimeoPoolMaps[data.player_id].timeTriggers = slice.call(
            _vimeoTimeTriggers
        );
    }
    if (_vimeoPoolMaps[data.player_id].timeTriggers.length > 0) {
        if (data.data.percent * 100 >=
            _vimeoPoolMaps[data.player_id].timeTriggers[0])
        {
            var action = _vimeoPoolMaps[data.player_id].timeTriggers.shift();
            _gas.push([
                '_trackEvent',
                'Vimeo Video',
                action + '%',
                _vimeo_urls[data.player_id]
            ]);
        }
    }
}

/**
 * Helper function to post messages to a vimeo player
 *
 * @param {string} method The method from the vimeo API.
 * @param {string} params to be passed as the value of the method.
 * @param {object} target Iframe DOM Element for the Vimeo player.
 * @return {boolean} true if it worked or false otherwise.
 */
function _vimeoPostMessage(method, params, target) {
    if (!target.contentWindow || !target.contentWindow.postMessage || !JSON) {
        return false;
    }
    var url = target.getAttribute('src').split('?')[0],
        data = JSON.stringify({
            method: method,
            value: params
        });
    target.contentWindow.postMessage(data, url);
    return true;
}


/**
 * Flag that indicates if the global listener has been bind to the window
 * @type {boolean}
 */
var _has_vimeo_window_event = false;

var _vimeoOpts;

/**
 * postMessage Listener
 * @param {Object} event The Vimeo API return event.
 */
/*jshint latedef:false*/
function _vimeoPostMessageListener(event) {
    if (sindexOf.call(event.origin, '//player.vimeo.com') > -1) {
        var data = JSON.parse(event.data);
        if (data.event === 'ready') {
            _trackVimeo.call(_gas.gh); // Force rerun since a player is ready
        } else if (data.method) {
            if (data.method === 'getVideoUrl') {
                _vimeo_urls[data.player_id] = data.value;
            }
        } else if (data.event === 'playProgress') {
            _vimeoPool(data);
        } else {
            _gas.push(['_trackEvent', _vimeoOpts['category'],
                data.event, _vimeo_urls[data.player_id]]);
        }
    }

}
/*jshint latedef:true*/

/**
 * Triggers the Vimeo Tracking on the page
 *
 * Only works for the Universal Tag from Vimeo (iframe). The video must have
 * the parameter api=1 on the url in order to make the tracking work.
 *
 * @this {GasHelper} GA Helper object.
 */
function _trackVimeo() {
    var iframes = document.getElementsByTagName('iframe');
    var vimeo_videos = 0;
    var player_id;
    var player_src;
    var separator;
    var force = _vimeoOpts['force'];
    var partials = _vimeoOpts['percentages'];
    for (var i = 0; i < iframes.length; i++) {
        if (sindexOf.call(iframes[i].src, '//player.vimeo.com') > -1) {
            player_id = 'gas_vimeo_' + i;
            player_src = iframes[i].src;
            separator = '?';
            if (sindexOf.call(player_src, '?') > -1) {
                separator = '&';
            }
            if (sindexOf.call(player_src, 'api=1') < 0) {
                if (force) {
                    // Reload the video enabling the api
                    player_src += separator + 'api=1&player_id=' + player_id;
                } else {
                    // We won't track players that don't have api enabled.
                    continue;
                }
            } else {
                if (sindexOf.call(player_src, 'player_id=') < -1) {
                    player_src += separator + 'player_id=' + player_id;
                }
            }
            vimeo_videos++;
            iframes[i].id = player_id;
            if (iframes[i].src !== player_src) {
                iframes[i].src = player_src;
                break; // break to wait until it is ready since we reloaded it.
            }
            // We need to cache the video url since vimeo won't provide it
            // in the event
            _vimeoPostMessage('getVideoUrl', '', iframes[i]);
            _vimeoPostMessage('addEventListener', 'play', iframes[i]);
            _vimeoPostMessage('addEventListener', 'pause', iframes[i]);
            _vimeoPostMessage('addEventListener', 'finish', iframes[i]);
            if (partials) {
                _vimeoTimeTriggers = partials;
                _vimeoPostMessage('addEventListener', 'playProgress',
                    iframes[i]);
            }
        }
    }
    if (vimeo_videos > 0 && _has_vimeo_window_event === false) {
        this._addEventListener(window, 'message',
            _vimeoPostMessageListener, false
        );
        _has_vimeo_window_event = true;
    }
}

var _gasTrackVimeo = function (opts) {
    var gh = this;
    // Support
    if (typeof opts === 'boolean' || opts === 'force') {
        opts = {'force': !!opts};
    }
    opts = opts || {};
    opts['category'] = opts['category'] || 'Vimeo Video';
    opts['percentages'] = opts['percentages'] || [];
    opts['force'] = opts['force'] || false;
    _vimeoOpts = opts;
    gh._DOMReady(function () {
        _trackVimeo.call(gh);
    });
    return false;
};

_gas.push(['_addHook', '_gasTrackVimeo', _gasTrackVimeo]);

// Old API to be deprecated on v2.0
_gas.push(['_addHook', '_trackVimeo', _gasTrackVimeo]);

