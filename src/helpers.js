/**
 * GAS - Google Analytics on Steroids
 *
 * Helper Functions
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * GasHelper singleton class
 *
 * Should be called when ga.js is loaded to get the pageTracker.
 *
 * @constructor
 */
var GasHelper = function() {
    this['tracker'] = window['_gat']['_getTrackerByName']();
};

/**
 * Returns true if the element is found in the Array, false otherwise.
 *
 * @param {Array} obj Array to search at.
 * @param {object} item Item to search form.
 * @return {boolean} true if contains.
 */
GasHelper.prototype.inArray = function(obj, item) {
    if (obj && obj.length) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i] === item) {
                return true;
            }
        }
    }
    return false;
};

/**
 * Checks if the object is an Array
 *
 * @param {object} obj Object to check.
 * @return {boolean} true if the object is an Array.
 */
GasHelper.prototype.isArray = function(obj) {
    return toString.call(obj) === '[object Array]';
};

/**
 * Removes special characters and Lowercase String
 *
 * @param {string} str to be sanitized.
 * @param {boolean} strict_opt If we should remove any non ascii char.
 * @return {string} Sanitized string.
 */
GasHelper.prototype._sanitizeString = function(str, strict_opt) {
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

    if (strict_opt) {
        str = str.replace(/[^a-z0-9_-]/g, '_');
    }
    return str.replace(/_+/g, '_');
};

/**
 * Cross Browser helper to addEventListener.
 *
 * ga_next.js currently have a _addEventListener directive. So _gas will
 * allways prefer that if available, and will use this one only as a fallback
 *
 * @param {HTMLElement} obj The Element to attach event to.
 * @param {string} evt The event that will trigger the binded function.
 * @param {function(event)} ofnc The function to bind to the element.
 * @param {boolean} bubble true if event should be fired at bubble phase.
 * Defaults to false. Works only on W3C compliant browser. MSFT don't support
 * it.
 * @return {boolean} true if it was successfuly binded.
 */
GasHelper.prototype._addEventListener = function(obj, evt, ofnc, bubble) {
    var fnc = function(event) {
        if (!event || !event.target) {
            event = window.event;
            event.target = event.srcElement;
        }
        return ofnc.call(obj, event);
    };
    // W3C model
    if (obj.addEventListener) {
        obj.addEventListener(evt, fnc, !!bubble);
        return true;
    }
    // M$ft model
    else if (obj.attachEvent) {
        return obj.attachEvent('on' + evt, fnc);
    }
    // Browser doesn't support W3C or M$ft model. Time to go old school
    else {
        evt = 'on' + evt;
        if (typeof obj[evt] === 'function') {
            // Object already has a function on traditional
            // Let's wrap it with our own function inside another function
            fnc = (function(f1, f2) {
                return function() {
                    f1.apply(this, arguments);
                    f2.apply(this, arguments);
                }
            })(obj[evt], fnc);
        }
        obj[evt] = fnc;
        return true;
    }
};

/**
 * Cross Browser DomReady function.
 *
 * Inspired by: http://dean.edwards.name/weblog/2006/06/again/#comment367184
 *
 * @param {function(Event)} callback DOMReady callback.
 * @return {boolean} Ignore return value.
 */
GasHelper.prototype._DOMReady = function(callback) {
    var cb = function() {
        if (arguments.callee.done) return;
        arguments.callee.done = true;
        callback.apply(this, arguments);
    };
    if (/interactive|complete/.test(document.readyState)) return cb();
    this._addEventListener(document, 'DOMContentLoaded', cb, false);
    this._addEventListener(window, 'load', cb, false);
};

