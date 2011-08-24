
function _trackOutboundLinks() {
    var links = document.links;
    for (var i = 0; i < links.length; i++) {
        if (
            sindexOf.call(links[i].href, 'http') == 0 &&
            sindexOf.call(links[i].href, document.location.host) < 0
       ) {
            this._addEventListener(
                links[i],
                'mousedown',
                (function(l) {
                    return function() {
                        var h = l.href.substring(
                            sindexOf.call(l.href, '//') + 2
                        );
                        var i = sindexOf.call(h, '/') > -1 ?
                            sindexOf.call(h, '/') : undefined;
                        var j = sindexOf.call(h, '__utma') > -1 ?
                            sindexOf.call(h, '__utma') : undefined;
                        _gaq.push(['_trackEvent',
                            'Outbound',
                            h.substring(0, i),
                            h.substring(i, j) || '',
                            0,
                            true //non-interactive
                        ]);
                    }
                })(links[i])
            );
        }
    }
}

_gas.push(['_addHook', '_trackOutboundLinks', function() {
    _trackOutboundLinks.call(this);
}]);

