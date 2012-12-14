/**
 * GAS - Google Analytics on Steroids
 *
 * Form Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * get the form name for a specific elemet
 *
 * @param {DOMElemet} el Dom Element.
 * @return {String} Form Name or Id.
 */
function getFormName(el) {
    while (el && el.nodeName !== 'HTML') {
        if (el.nodeName === 'FORM') {break; }
        el = el.parentNode;
    }
    if (el.nodeName === 'FORM') {
        return el.name || el.id || 'none';
    }
    return 'none';
}

var _gasTrackForms = function (opts) {
    if (!this._formTracked) {
        this._formTracked = true;
    } else {
        //Oops double tracking detected.
        return false;
    }
    var scp = this;
    if (typeof opts !== 'object') {
        opts = {};
    }

    // Make sure required attrs are defined or fallback to default
    opts['category'] = opts['category'] || 'Form Tracking';
    //opts['live'] = opts['live'] || true; //Ignored

    var trackField = function (e) {
        var el = e.target,
            el_name = el.name || el.id || el.type || el.nodeName,
            form_name = getFormName(el),
            action = 'form (' + form_name + ')',
            label = el_name + ' (' + e.type + ')';

        _gas.push(['_trackEvent', opts['category'], action, label]);
    };

    scp._DOMReady(function () {
        var changeTags = ['input', 'select', 'textarea', 'hidden'];
        var submitTags = ['form'];
        var elements = [];
        var i, j;
        for (i = 0; i < changeTags.length; i++) {
            elements = document.getElementsByTagName(changeTags[i]);
            for (j = 0; j < elements.length; j++) {
                scp._addEventListener(elements[j], 'change', trackField);
            }
        }
        for (i = 0; i < submitTags.length; i++) {
            elements = document.getElementsByTagName(submitTags[i]);
            for (j = 0; j < elements.length; j++) {
                scp._addEventListener(elements[j], 'submit', trackField);
            }
        }
    });
    return false;
};

_gas.push(['_addHook', '_gasTrackForms', _gasTrackForms]);

// Old API to be deprecated on v2.0
_gas.push(['_addHook', '_trackForms', _gasTrackForms]);
