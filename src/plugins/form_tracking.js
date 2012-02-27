/**
 * GAS - Google Analytics on Steroids
 *
 * Form Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the MIT license.
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
      if (el.nodeName === 'FORM') {break;}
      el = el.parentNode;
    }
    if (el.nodeName === 'FORM') {
        return el.name || el.id || 'none';
    }
    return 'none';
}

_gas.push(['_addHook', '_trackForms', function(opts) {
    var scp = this;
    if (typeof opts !== 'object') {
        opts = {};
    }

    // Make sure required attrs are defined or fallback to default
    opts['category'] = opts['category'] || 'Form Tracking';
    //opts['live'] = opts['live'] || true; //Ignored

    var trackField = function(e) {
        var el = e.target,
            el_name = el.name || el.id || el.type || el.nodeName,
            form_name = getFormName(el),
            action = 'form (' + form_name + ')',
            label = el_name + ' (' + e.type + ')';

        _gas.push(['_trackEvent', opts['category'], action, label]);
    }

    scp._liveEvent('input,select,textarea,hidden', 'change', trackField);
    //scp._liveEvent('button,submit,image,reset', 'click', trackField);
    scp._liveEvent('form', 'submit', trackField);


}]);

