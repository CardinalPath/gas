/**
 * GAS - Google Analytics on Steroids
 *
 * HTML5 Video Tracking Plugin
 *
 * Copyright 2011, Cardinal Path
 * Licensed under the GPLv3 license.
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
var _trackMedia = function (tag) {
    var self = this;
    self._liveEvent(tag, 'play', _trackMediaElement);
    self._liveEvent(tag, 'pause', _trackMediaElement);
    self._liveEvent(tag, 'ended', _trackMediaElement);
};

var _trackVideo = function () {
    if (!this._videoTracked) {
        this._videoTracked = true;
    } else {
        //Oops double tracking detected.
        return;
    }
    _trackMedia.call(this, 'video');
};

var _trackAudio = function () {
    if (!this._audioTracked) {
        this._audioTracked = true;
    } else {
        //Oops double tracking detected.
        return;
    }
    _trackMedia.call(this, 'audio');
};

_gas.push(['_addHook', '_gasTrackVideo', _trackVideo]);
_gas.push(['_addHook', '_gasTrackAudio', _trackAudio]);

// Old API to be deprecated on v2.0
_gas.push(['_addHook', '_trackVideo', _trackVideo]);
_gas.push(['_addHook', '_trackAudio', _trackAudio]);

