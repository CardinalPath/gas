/*!
 * GAS - Google Analytics on Steroids
 * Max Scroll Tracking Plugin
 *
 * Copyright 2011, Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardo.cereto@directperformance.com.br>
 * @version $Revision$
 *
 * Based on http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
 *
 * $Date$
 */


(function(window, undefined) {

    window._gas = window._gas || [];
    if (typeof _gas._functions === 'undefined') {
        _gas._functions = {};
    }

    function bind(obj, evt, fnc) {
        if (obj.addEventListener) {
            obj.addEventListener(evt, fnc, false);
            return true;
        } else if (obj.attachEvent) {
            return obj.attachEvent('on' + evt, fnc);
        }
        else {
            obj['on' + evt] = fnc;
        }
    }


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

    function get_doc_height() {
        var D = document;
        return Math.max(
            Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
            Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
            Math.max(D.body.clientHeight, D.documentElement.clientHeight)
        );
    }


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
    function update_scroll_percentage() {
        if (t) {
            clearTimeout(t);
        }
        t = setTimeout(function() {
            max_scroll = get_scroll_percentage();
        }, 400);
    }


    function track_max_scroll() {
        bind(window, 'beforeunload', function() {
            var bucket = Math.floor(max_scroll / 10) * 10;
            if (bucket < 100) {
                var bucket = String(bucket) + '-' + String(bucket + 9);
            }

            _gas.push(['_trackEvent',
                'Max Scroll',
                document.location.href,
                String(bucket),
                Math.round(max_scroll)
            ]);
        });

    }

    _gas._functions._trackMaxSrcoll = function() {
        bind(window, 'scroll', update_scroll_percentage);
        track_max_scroll();
    }
})(window);

