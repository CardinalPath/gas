(function(window, undefined) {

window._gas = _gas || [];

// Execute previous functions
while (_gas._queue.length > 0) {
    _gas.push(_gas._queue.shift());
}

// Import ga.js
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

})(window);

