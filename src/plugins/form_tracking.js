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
    if (opt_live === undefined) {
        opt_live = false;
    }

    function tag_element(e) {
        var el = e.target || this;
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
                    el.tagName.toLowerCase()
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
    for (var i = 0; i < document.forms.length; i++) {
        try {
            // I'm not sure why it sometimes fails at Fx4 and ie8
            //FIXME: Fail with type error since it cant found the helpers on
            // 'this' object.
            track_form.call(scp, document.forms[i], opt_live);
        }catch (e) {}
        if (opt_live) break;
    }
    return false;
}]);

