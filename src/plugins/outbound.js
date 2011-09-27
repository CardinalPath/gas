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
        this._addEventListener(
        window,
        'mousedown',
        function(e) {
            var l = e.target;
            if (l.nodeName === 'A' &&
                sindexOf.call(l.href, 'http') == 0 &&
                sindexOf.call(l.href, document.location.host) < 0)
            {
                var h = l.href.substring(
                    sindexOf.call(l.href, '//') + 2
                );
                var i = sindexOf.call(h, '/') > -1 ?
                    sindexOf.call(h, '/') : undefined;
                var j = sindexOf.call(h, '__utm') > -1 ?
                    (sindexOf.call(h, '__utm') - 1) : undefined;
                _gas.push(['_trackEvent',
                    'Outbound',
                    h.substring(0, i),
                    h.substring(i, j) || '',
                    0,
                    true //non-interactive
                ]);
            }
        }
    );
}

_gas.push(['_addHook', '_trackOutboundLinks', _trackOutboundLinks]);

