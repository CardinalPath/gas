/*!
 * GAS - Google Analytics on Steroids
 * Max Scroll Tracking Plugin
 *
 * Copyright 2011, Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 * @version $Revision$
 *
 * Based on http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
 *
 * $Date$
 */

/**
 * Get current windows width and heigtht
 *
 * @return {Array.<number>} [width,height].
 */
function get_window_size() {
    var myWidth = 0, myHeight = 0;
    if (typeof(window.innerWidth) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (
        document.documentElement &&
        (
            document.documentElement.clientWidth ||
            document.documentElement.clientHeight
        )
    ) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (
        document.body &&
        (
            document.body.clientWidth ||
            document.body.clientHeight
        )
    ) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }

    return [myWidth, myHeight];
}

/**
 * Get current absolute window scroll position
 *
 * @return {Array.<number>} [XScroll,YScroll].
 */
function get_window_scroll() {
    var scrOfX = 0, scrOfY = 0;
    if (typeof(window.pageYOffset) == 'number') {
        //Netscape compliant
        scrOfY = window.pageYOffset;
        scrOfX = window.pageXOffset;
    } else if (
        document.body &&
        (
            document.body.scrollLeft ||
            document.body.scrollTop
        )
    ) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
        scrOfX = document.body.scrollLeft;
    } else if (
        document.documentElement &&
        (
            document.documentElement.scrollLeft ||
            document.documentElement.scrollTop
        )
    ) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
        scrOfX = document.documentElement.scrollLeft;
    }
    return [scrOfX, scrOfY];
}

/**
 * Get current absolute document height
 *
 * @return {number} Current document height.
 */
function get_doc_height() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}


/**
 * Get current vertical scroll percentage
 *
 * @return {number} Current vertical scroll percentage.
 */
function get_scroll_percentage() {
    return ((
        get_window_scroll()[1] +
        get_window_size()[1]

    ) / (
        get_doc_height()
    )) * 100;
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


function track_max_scroll() {
    this._addEventListener(window, 'beforeunload', function() {
        update_scroll_percentage(true);
        var bucket = Math.floor(max_scroll / 10) * 10;
        if (bucket < 100) {
            var bucket = String(bucket) + '-' + String(bucket + 9);
        }

        _gas.push(['_trackEvent',
            'Max Scroll',
            url,
            String(bucket),
            Math.round(max_scroll)
        ]);
    });

}

_gas.push(['_addHook', '_trackMaxSrcoll', function() {
    this._addEventListener(window, 'scroll', update_scroll_percentage);
    track_max_scroll.call(this);
}]);

