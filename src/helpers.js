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
/*jshint -W079*/
var GasHelper = function () {
    this._setDummyTracker();
};
/*jshint +W079*/

GasHelper.prototype._setDummyTracker = function () {
    if (!this['tracker']) {
        var trackers = window['_gat']['_getTrackers']();
        if (trackers.length > 0) {
            this['tracker'] = trackers[0];
        }
    }
};

/**
 * Returns true if the element is found in the Array, false otherwise.
 *
 * @param {Array} obj Array to search at.
 * @param {object} item Item to search form.
 * @return {boolean} true if contains.
 */
GasHelper.prototype.inArray = function (obj, item) {
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
GasHelper.prototype._addEventListener = function (obj, evt, ofnc, bubble) {
    var fnc = function (event) {
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
            fnc = (function (f1, f2) {
                return function () {
                    f1.apply(this, arguments);
                    f2.apply(this, arguments);
                };
            }(obj[evt], fnc));
        }
        obj[evt] = fnc;
        return true;
    }
};

/**
 * Cross Browser Helper to emulate jQuery.live
 *
 * Binds to the document root. Listens to all events of the specific type.
 * If event don't bubble it won't catch
 */
GasHelper.prototype._liveEvent = function (tag, evt, ofunc) {
    var gh = this;
    tag = tag.toUpperCase();
    tag = tag.split(',');

    gh._addEventListener(document, evt, function (me) {
        var el = me.target;

        while (el && el.nodeName && el.nodeName.toUpperCase() !== 'HTML')
        {
            if (gh.inArray(tag, el.nodeName)) {
                ofunc.call(el, me);
                break;
            }
            el = el.parentNode;
        }

    }, true);
};

/**
 * Cross Browser DomReady function.
 *
 * Inspired by: http://dean.edwards.name/weblog/2006/06/again/#comment367184
 *
 * @param {function(Event)} callback DOMReady callback.
 * @return {boolean} Ignore return value.
 */
GasHelper.prototype._DOMReady = function (callback) {
    var scp = this;
    function cb() {
        if (cb.done) return;
        cb.done = true;
        callback.apply(scp, arguments);
    }
    if (/^(interactive|complete)/.test(document.readyState)) return cb();
    this._addEventListener(document, 'DOMContentLoaded', cb, false);
    this._addEventListener(window, 'load', cb, false);
};

