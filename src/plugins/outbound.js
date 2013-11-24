/**
 * GAS - Google Analytics on Steroids
 *
 * Outbound Link Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * Triggers the Outbound Link Tracking on the page
 *
 * @this {object} GA Helper object.
 * @param {object} opts Custom options for Outbound Links.
 */
var _gasTrackOutboundLinks = function (opts) {
    if (!this._outboundTracked) {
        this._outboundTracked = true;
    } else {
        //Oops double tracking detected.
        return;
    }
    var gh = this;
    if (!opts) {
        opts = {};
    }
    opts['category'] = opts['category'] || 'Outbound';

    gh._liveEvent('a', 'mousedown', function (e) {
        var l = this;
        if (
            (l.protocol === 'http:' || l.protocol === 'https:') &&
            sindexOf.call(l.hostname, document.location.hostname) === -1)
        {
            var path = (l.pathname + l.search + ''),
                utm = sindexOf.call(path, '__utm');
            if (utm !== -1) {
                path = path.substring(0, utm);
            }
            _gas.push(['_trackEvent',
                opts['category'],
                l.hostname,
                path,
                0,
                true
            ]);
        }

    });
    return false;
};

_gas.push(['_addHook', '_gasTrackOutboundLinks', _gasTrackOutboundLinks]);

// Old API to be deprecated on v2.0
_gas.push(['_addHook', '_trackOutboundLinks', _gasTrackOutboundLinks]);


