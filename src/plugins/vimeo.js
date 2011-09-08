/**
 * GAS - Google Analytics on Steroids
 *
 * Vimeo Video Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * Helper function to post messages to a vimeo player
 *
 * @param {string} method The method from the vimeo API.
 * @param {string} params to be passed as the value of the method.
 * @param {object} target Iframe DOM Element for the Vimeo player.
 * @return {boolean} true if it worked or false otherwise.
 */
function _vimeoPostMessage(method, params, target) {
    if (!target.contentWindow || !target.contentWindow.postMessage) {
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
 * Cached urls for vimeo players on the page.
 *
 * @type {object}
 */
var _vimeo_urls = {};

/**
 * Flag that indicates if the global listener has been bind to the window
 * @type {boolean}
 */
var _has_vimeo_window_event = false;

/**
 * Triggers the Vimeo Tracking on the page
 *
 * Only works for the Universal Tag from Vimeo (iframe). The video must have
 * the parameter api=1 on the url in order to make the tracking work.
 *
 * @this {object} GA Helper object.
 * @param {(string|boolean)} force evaluates to true if we should force the
 * api=1 parameter on the url to activate the api. May cause the player to
 * reload.
 */
function _trackVimeo(force) {
    var iframes = document.getElementsByTagName('iframe');
    var vimeo_videos = 0;
    var player_id;
    var player_src;
    var separator;
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
                }else {
                    // We won't track players that don't have api enabled.
                    break;
                }
            }else {
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
        }
    }
    if (vimeo_videos > 0 && _has_vimeo_window_event === false) {
        this._addEventListener(window, 'message', function(event) {
            if (sindexOf.call(event.origin, '//player.vimeo.com') > -1) {
                var data = JSON.parse(event.data);
                if (data.event === 'ready') {
                    _trackVimeo(); // Force rerun since a player is ready
                }else if (data.method) {
                    if (data.method == 'getVideoUrl') {
                        _vimeo_urls[data.player_id] = data.value;
                    }
                } else {
                    _gas.push(['_trackEvent', 'Vimeo Video',
                        data.event, _vimeo_urls[data.player_id]]);
                }
            }

        }, false);
        _has_vimeo_window_event = true;
    }
}

window._gas.push(['_addHook', '_trackVimeo', function(force) {
    _trackVimeo.call(this, force);
    return false;
}]);

