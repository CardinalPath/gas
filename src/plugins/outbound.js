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
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        this._addEventListener(
            links[i],
            'mousedown',
            function(e) {
                var l = e.target;
                if (
                    (l.protocol == 'http:' || l.protocol == 'https:') &&
                    sindexOf.call(l.href, document.location.hostname) === -1)
                {
                    var path = (l.pathname + l.search + ''),
                        utm = sindexOf.call(path, '__utm');
                    if (utm !== -1) {
                        path = path.substring(0, utm);
                    }
                    _gas.push(['_trackEvent',
                        'Outbound',
                        l.hostname,
                        path
                    ]);
                }
            }
        );
    }
}

_gas.push(['_addHook', '_trackOutboundLinks', _trackOutboundLinks]);


