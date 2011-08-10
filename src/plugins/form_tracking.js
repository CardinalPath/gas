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
        this._addEventListener(document.body, 'click', function(e) {
            try {
                var el = e.target;
                if (e.type == 'click' &&
                  this.inArray(['button', 'submit', 'image', 'reset'],
                    el.type.toLowerCase()
                  )
                ) {

                    tag_element(e);
                }
            }catch (e) {} //Ignore errors here.
        });
        this._addEventListener(document.body, 'change', function(e) {
            try {
                var el = e.target;
                if (e.type == 'change' &&
                  this.inArray(['input', 'select', 'textarea', 'hidden'],
                    el.nodeName.toLowerCase()
                  )
                ) {

                    tag_element(e);
                }
            }catch (e) {} //Ignore errors here.
        });
    }else {
        var i, el;
        if (!form.elements || !form.elements.length) {
            return false;
        }
        for (i = 0; i < form.elements.length; i++) {
            el = form.elements[i];
            if (this.inArray(['button', 'submit', 'image', 'reset'], el.type)) {
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

