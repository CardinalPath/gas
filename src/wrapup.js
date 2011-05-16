/*!
 * Wrap-up
 */
// Execute previous functions
while (window._gas._queue.length > 0) {
    window._gas.push(window._gas._queue.shift());
}

// Import ga.js
if (_gaq && _gaq.length >= 0) {
    (function() {
            var ga = document.createElement('script');
            ga.type = 'text/javascript';
            ga.async = true;
            ga.src = (
                'https:' == document.location.protocol ?
                    'https://ssl' :
                    'http://www'
            ) +
                '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s);
    })();
}

