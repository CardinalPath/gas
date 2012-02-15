/**
 * GAS - Google Analytics on Steroids
 *
 * Max-Scroll Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * Get current browser viewpane heigtht
 *
 * @return {number} height.
 */
function _get_window_height() {
    return window.innerHeight || documentElement.clientHeight ||
        document.body.clientHeight || 0;
}

/**
 * Get current absolute window scroll position
 *
 * @return {number} YScroll.
 */
function _get_window_Yscroll() {
    return window.pageYOffset || document.body.scrollTop ||
        documentElement.scrollTop || 0;
}

/**
 * Get current absolute document height
 *
 * @return {number} Current document height.
 */
function _get_doc_height() {
    return Math.max(
        document.body.scrollHeight || 0, documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0, documentElement.offsetHeight || 0,
        document.body.clientHeight || 0, documentElement.clientHeight || 0
    );
}


/**
 * Get current vertical scroll percentage
 *
 * @return {number} Current vertical scroll percentage.
 */
function _get_scroll_percentage() {
    return (
        (_get_window_Yscroll() + _get_window_height()) / _get_doc_height()
    ) * 100;
}

var _t = null;
var _max_scroll = 0;
function _update_scroll_percentage(now) {
    if (_t) {
        clearTimeout(_t);
    }
    if (now === true) {
        _max_scroll = Math.max(_get_scroll_percentage(), _max_scroll);
        return;
    }
    _t = setTimeout(function() {
        _max_scroll = Math.max(_get_scroll_percentage(), _max_scroll);
    }, 400);
}

function _sendMaxScroll() {
    _update_scroll_percentage(true);
    _max_scroll = Math.floor(_max_scroll);
    if (_max_scroll <= 0 || _max_scroll > 100) return;
    var bucket = (_max_scroll > 10 ? 1 : 0) * (
        Math.floor((_max_scroll - 1) / 10) * 10 + 1
    );
    bucket = String(bucket) + '-' +
        String(Math.ceil(_max_scroll / 10) * 10);

    _gas.push(['_trackEvent',
        _maxScrollOpts['category'],
        url,
        bucket,
        Math.floor(_max_scroll),
        true // non-interactive
    ]);
}

var _maxScrollOpts;
/**
 * Tracks the max Scroll on the page. 
 * 
 * @param {object} opts GAS Options to be used.
 */
function _trackMaxScroll(opts) {
    _maxScrollOpts = opts || {};
    _maxScrollOpts['category'] = _maxScrollOpts['category'] || 'Max Scroll';

    this._addEventListener(window, 'scroll', _update_scroll_percentage);
    this._addEventListener(window, 'beforeunload', _sendMaxScroll);
}

_gas.push(['_addHook', '_trackMaxScroll', _trackMaxScroll]);

