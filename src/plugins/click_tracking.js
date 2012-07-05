/**
 * GAS - Google Analytics on Steroids
 *
 * Click Tracking Plugin
 *
 * Copyright 2012, Cardinal Path
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * Enable click tracking for class ga_track or opts.css_class
 *
 * @this {GasHelper} GA Helper object.
 * @param {object} opts The url to check.
 */
function _clickTracking(opts) {
    var gh = this;
    opts = opts || {};
    opts['css_class'] = opts['css_class'] || ['ga_track'];
    opts['category'] = opts['category'] || 'Click Tracking';
    var re = opts['css_class'].join('|');
    gh._addEventListener(document, evt, function(me) {
        for (var el = me.target; el.nodeName !== 'HTML'; el = el.parentNode)
        {
            if (el && el.className && el.className.match(re) !== null) {
                for (var i in opts['css_class']) {
                    _gas.push(['_trackEvent', opts['category'], 'click']);
                    break;
                }
            }
            if (!el || el.parentNode === null) {
                break;
            }
        }

    }, true);

    return false;
}

/**
 * GAS Hook, receive the extensions to extend default extensions. And trigger
 * the binding of the events.
 */
_gas.push(['_addHook', '_gasClickTracking', _clickTracking]);


