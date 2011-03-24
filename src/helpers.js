/*!
 * GAS - Google Analytics on Steroids
 * Helper Functions
 *
 * Copyright 2011, Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardo.cereto@directperformance.com.br>
 * @version $Revision$
 *
 * $Date$
 */

var gas_helpers = {};

gas_helpers['_sanitizeString'] = function(str) {
    str = str.toLowerCase()
        .replace(/^\ +/, '')
        .replace(/\ +$/, '')
        .replace(/\s+/g, '_')
        .replace(/[áàâãåäæª]/g, 'a')
        .replace(/[éèêëЄ€]/g, 'e')
        .replace(/[íìîï]/g, 'i')
        .replace(/[óòôõöøº]/g, 'o')
        .replace(/[úùûü]/g, 'u')
        .replace(/[ç¢©]/g, 'c');
    return str;
};

gas_helpers['_addEventListener'] = function(obj, evt, fnc) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fnc, false);
        return true;
    } else if (obj.attachEvent) {
        return obj.attachEvent('on' + evt, fnc);
    }
    else {
        obj['on' + evt] = fnc;
    }
};

_gas.push(function() {
    function extend(obj) {
        for (var i in obj) {
            if (!(i in this)) {
                this[i] = obj[i];
            }
        }
    }

    var tracker = _gat._createTracker();

    // Extend Tracker
    extend.call(tracker, gas_helpers);

    _gas.gh = tracker;

});

