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
 * Enable form tracking for 1 form
 *
 * @this {GasHelper} The Ga Helper object
 * @param {HTMLFormElement} form The form element to be tagged.
 * @param {boolean=} opt_live if we should use live binding. Defaults to false.
 * @return {boolean} false if the form has no elements.
 */
function track_form(form, opt_live) {
    var scp = this;

    function tag_element(e) {
        var el = e.target;
        var el_name = el.name || el.id || el.type || el.nodeName;
        var action_name = e.type;
        var form_name = form.name || form.id || undefined;

        form_name = form_name ? ' (' + form_name + ')' : '';

        _gas.push(['_trackEvent',
            'Form Tracking', //category
            'form' + form_name, //action
            el_name + ' (' + action_name + ')' //label
        ]);
    }


    if (opt_live) {
        scp._addEventListener(window, 'click', function(e) {
            try {
                var el = e.target;
                if (e.type == 'click' &&
                  scp.inArray(['button', 'submit', 'image', 'reset'],
                    el.type.toLowerCase()
                  )
                ) {

                    tag_element(e);
                }
            }catch (e) {} //Ignore errors here.
        });
        scp._addEventListener(document.body, 'change', function(e) {
            try {
                var el = e.target;
                if (e.type == 'change' &&
                  scp.inArray(['input', 'select', 'textarea', 'hidden'],
                    el.nodeName.toLowerCase()
                  )
                ) {

                    tag_element(e);
                }
            }catch (e) {} //Ignore errors here.
        });
        //TODO: Track the submit on live binding
    }else {
        var i, el;
        if (!form.elements || !form.elements.length) {
            return false;
        }
        for (i = 0; i < form.elements.length; i++) {
            el = form.elements[i];
            if (scp.inArray(['button', 'submit', 'image', 'reset'], el.type)) {
                //Button
                scp._addEventListener(el, 'click', tag_element);
            }
            else {
                //Text field
                scp._addEventListener(el, 'change', tag_element);
            }
        }
        scp._addEventListener(form, 'submit', tag_element);
    }
}

_gas.push(['_addHook', '_trackForms', function(opt_live) {
    var scp = this;
    this._DOMReady(function() {
        var forms = document.getElementsByTagName('form');
        for (var i = 0; i < forms.length; i++) {
            try {
                track_form.call(scp, forms[i], opt_live);
            }catch (e) {}
            if (opt_live) break;
        }
        return false;
    });
}]);

