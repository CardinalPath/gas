/**
 * GAS - Google Analytics on Steroids
 *
 * Outbound Link Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * Triggers the Outbound Link Tracking on the page
 *
 * @this {object} GA Helper object.
 */
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

window._gas.push(['_addHook', '_trackOutboundLinks', function() {
    _trackOutboundLinks.call(this);
}]);

