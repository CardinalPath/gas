/**
 * GAS - Google Analytics on Steroids
 *
 * MailTo tracking plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 */

/**
 * GAS plugin to track mailto: links
 *
 * @param {object} opts GAS Options.
 */
var _gasTrackMailto = function(opts) {
    if (!this._mailtoTracked) {
        this._mailtoTracked = true;
    }else {
        //Oops double tracking detected.
        return;
    }

    if (!opts) {
        opts = {};
    }
    opts['category'] = opts['category'] || 'Mailto';

    this._liveEvent('a', 'mousedown', function(e) {
        var el = e.target;
        if (el && el.href && el.href.toLowerCase().indexOf('mailto:') === 0) {
            _gas.push(['_trackEvent', opts['category'], el.href.substr(7)]);
        }
    });
    return false;
};
_gas.push(['_addHook', '_gasTrackMailto', _gasTrackMailto]);

// Old API to be deprecated on v2.0
_gas.push(['_addHook', '_trackMailto', _gasTrackMailto]);

