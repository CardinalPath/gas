/*!
 * GAS - Google Analytics on Steroids
 * Video Tracking plugin
 *
 * Supports Vimeo only
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
        if (sindexOf.call(iframes[i].src, '//player.vimeo.com') > 0) {
            postMessage('addEventListener', 'play', iframes[i]);
            postMessage('addEventListener', 'pause', iframes[i]);
            postMessage('addEventListener', 'finish', iframes[i]);
        }
    }
    if (_has_vimeo_window_event === false) {
        this._addEventListener(window, 'message', function(event) {
            if (sindexOf.call(event.origin, '//player.vimeo.com')) {
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

window._gas.push(['_addHook', '_trackVimeo', function() {
    _trackVimeo.call(this);
}]);


