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
function get_window_height() {
    return window.innerHeight || documentElement.clientHeight ||
        document.body.clientHeight || 0;
}

/**
 * Get current absolute window scroll position
 *
 * @return {number} YScroll.
 */
function get_window_Yscroll() {
    return window.pageYOffset || document.body.scrollTop ||
        documentElement.scrollTop || 0;
}

/**
 * Get current absolute document height
 *
 * @return {number} Current document height.
 */
function get_doc_height() {
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
function get_scroll_percentage() {
    return (
        (get_window_Yscroll() + get_window_height()) / get_doc_height()
    ) * 100;
}

var t = null;
var max_scroll = 0;
function update_scroll_percentage(now) {
    if (t) {
        clearTimeout(t);
    }
    if (now === true) {
        max_scroll = Math.max(get_scroll_percentage(), max_scroll);
        return;
    }
    t = setTimeout(function() {
        max_scroll = Math.max(get_scroll_percentage(), max_scroll);
    }, 400);
}

function _trackMaxScroll() {
    this._addEventListener(window, 'scroll', update_scroll_percentage);
    this._addEventListener(window, 'beforeunload', function() {
        update_scroll_percentage(true);
        var bucket = Math.floor(max_scroll / 10) * 10;
        if (bucket < 100) {
            var bucket = String(bucket) + '-' + String(bucket + 9);
        }

        _gas.push(['_trackEvent',
            'Max Scroll',
            url,
            bucket,
            max_scroll,
            true // non-interactive
        ]);
    });
}

_gas.push(['_addHook', '_trackMaxScroll', _trackMaxScroll]);

