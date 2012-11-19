/**
 * Wrap-up
 */
// Execute previous functions
while (_gas._queue.length > 0) {
    _gas.push(_gas._queue.shift());
}

// Import ga.js
if (typeof window._gat === 'undefined') {
    (function () {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = (
            'https:' === document.location.protocol ?
                'https://ssl' :
                'http://www'
        ) +
            '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    }());
}

