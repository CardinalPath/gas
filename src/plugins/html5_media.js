/**
 * GAS - Google Analytics on Steroids
 *
 * HTML5 Video Tracking Plugin
 *
 * Copyright 2011, Cardinal Path
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * Triggers the actual video/audio GA events
 *
 * To be used as a callback for the HTML5 media events
 *
 * @param {Event} e A reference to the HTML event fired.
 * @this {HTMLMediaElement} The HTML element firing the event
 */
function _trackMediaElement(e) {
    _gas.push(['_trackEvent', this.tagName, e.type, this.currentSrc]);
}

/**
 * Triggers the HTML5 Video Tracking on the page

 * @param {String} tag Either 'audio' or 'video'.
 * @this {GasHelper} GA Helper object.
 */
function _trackMedia(tag) {
    var self = this;
    self._DOMReady(function() {
        var vs = document.getElementsByTagName(tag);
        for (var i = 0; i < vs.length; i++) {
            self._addEventListener(vs[i], 'play', _trackMediaElement);
            self._addEventListener(vs[i], 'ended', _trackMediaElement);
            self._addEventListener(vs[i], 'pause', _trackMediaElement);
        }
    });
}

function _trackVideo() {
    _trackMedia.call(this, 'video');
}

function _trackAudio() {
    _trackMedia.call(this, 'audio');
}

_gas.push(['_addHook', '_trackVideo', _trackVideo]);
_gas.push(['_addHook', '_trackAudio', _trackAudio]);

