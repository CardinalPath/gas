/*!
 * GAS - Google Analytics on Steroids
 * Form Tracking Plugin
 *
 * Copyright 2011, Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 * @version $Revision$
 *
 * $Date$
 */
function track_form(form) {

    function tag_element(e) {
        var el = e.target;
        var el_name = el.name || el.id || el.type;
        var action_name = e.type;
        var form_name = form.name || form.id;

        form_name = form_name ? ' (' + form_name + ')' : '';

        _gas.push(['_trackEvent',
            'Form Tracking', //category
            'form' + form_name, //action
            el_name + ' (' + action_name + ')' //label
        ]);
    }

    var i, el;
    for (i in form.elements) {
        el = form.elements[i];
        if (['button', 'submit'].indexOf(el.type) >= 0) {
            //Button
            this._addEventListener(el, 'click', tag_element);
        }
        else {
            //Text field
            this._addEventListener(el, 'change', tag_element);
        }
    }
    this._addEventListener(form, 'submit', tag_element);
}

_gas.push(['_addHook', '_trackForms', function() {
    for (var i in document.forms) {
        track_form.call(this, document.forms[i]);
    }
    return false;
}]);

