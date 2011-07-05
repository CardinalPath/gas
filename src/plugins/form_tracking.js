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
function track_form(form, opt_live) {
    if (opt_live === undefined) {
        opt_live = false;
    }

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


    if (opt_live) {
        this._addEventListener(document.body, 'click', function(e) {
            try {
                var el = e.target;
                if (e.type == 'click' &&
                  ['button',
                  'submit',
                  'image',
                  'reset'].indexOf(el.type.toLowerCase()) >= 0) {

                    tag_element(e);
                }
            }catch (e) {} //Ignore errors here.
        });
        this._addEventListener(document.body, 'change', function(e) {
            try {
                var el = e.target;
                if (e.type == 'change' &&
                  ['input',
                  'select',
                  'textarea',
                  'hidden'].indexOf(el.nodeName.toLowerCase()) >= 0) {

                    tag_element(e);
                }
            }catch (e) {} //Ignore errors here.
        });
    }else {
        var i, el;
        for (i in form.elements) {
            el = form.elements[i];
            if (['button', 'submit', 'image', 'reset'].indexOf(el.type) >= 0) {
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
}

/**
 * Triggers the execution
 *
 * @param {boolean} opt_live Either it should use live or not. Default to false.
 */
_gas.push(['_addHook', '_trackForms', function(opt_live) {
    for (var i = 0; i < document.forms.length; i++) {
        track_form.call(this, document.forms[i], opt_live);
        if (opt_live) break;
    }
    return false;
}]);

