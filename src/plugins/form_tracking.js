/*!
 * GAS - Google Analytics on Steroids
 * Form Tracking Plugin
 *
 * Copyright 2011, Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardo.cereto@directperformance.com.br>
 * @version $Revision$
 *
 * $Date$
 */


(function(window, undefined) {
    window._gas = window._gas || [];
    if (typeof _gas._functions === 'undefined') {
        _gas._functions = {};
    }

    function bind(obj, evt, fnc) {
        if (obj.addEventListener) {
            obj.addEventListener(evt, fnc, false);
            return true;
        } else if (obj.attachEvent) {
            return obj.attachEvent('on' + evt, fnc);
        }
        else {
            obj['on' + evt] = fnc;
        }
    }


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
                bind(el, 'click', tag_element);
            }
            else {
                //Text field
                bind(el, 'change', tag_element);
            }
        }
        bind(form, 'submit', tag_element);
    }

    _gas._functions._trackForms = function() {
        for (var i in document.forms) {
            track_form(document.forms[i]);
        }
    }
})(window);


