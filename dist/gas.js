(function(window, undefined) {
/*!
 * GAS - Google Analytics on Steroids v0.1
 *
 * Copyright 2011, Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardo.cereto@directperformance.com.br>
 * @version $Revision$
 *
 * $Date$
 */


var document = window.document;
window._gaq = window._gaq || [];

var _prev_gas = window._gas || [];

// Avoid duplicate definition
if (_prev_gas._accounts_length >= 0) {
    return;
}

//Shortcuts
var toString = Object.prototype.toString,
    hasOwn = Object.prototype.hasOwnProperty,
    push = Array.prototype.push,
    slice = Array.prototype.slice,
    trim = String.prototype.trim,
    indexOf = Array.prototype.indexOf,
    url = document.location.href;


window._gas = {
    _accounts: {},
    _accounts_length: 0,
    _hooks: {},
    //_plugins: {},
    _functions: {},
    _queue: _prev_gas
};

_gas._functions._addHook = function(fn, cb) {
    if (typeof fn === 'string' && typeof cb === 'function') {
        if (typeof _gas._hooks[fn] === 'undefined') {
            _gas._hooks[fn] = [];
        }
        _gas._hooks[fn].push(cb);
    }
};

// Watchout for circular calls
_gas._functions._trackException = function(exception, message) {
    _gas.push(['_trackEvent',
        'Exception ' + (exception.name || 'Error'),
        message || exception.message || exception,
        url
    ]);
};

_gas._push_inner = function() {
    var args = slice.call(arguments),
        sub = args.shift(),
        i, foo, hooks, acct_name, repl_sub;

    if (typeof sub === 'function') {
        // Pushed functions are executed right away
        return _gaq.push(
            (function(s) {
                var f = function() {
                    s.call(_gas);
                };
                return f;
            })(sub)
        );

    }else if (typeof sub === 'object' && sub.length > 0) {
        foo = sub.shift();

        if (indexOf.call(foo, '.') >= 0) {
            acct_name = foo.split('.')[0];
            foo = foo.split('.')[1];
        }

        // Execute hooks
        hooks = _gas._hooks[foo];
        if (hooks && hooks.length > 0) {
            for (i = 0; i < hooks.length; i++) {
                try {
                    repl_sub = hooks[i].apply(_gas.gh, sub);
                    if (repl_sub === false) {
                        // Returning false from a hook cancel the call
                        return 1;
                    }
                    if (repl_sub && repl_sub.length > 0) {
                        // Returning an array changes the call parameters
                        sub = repl_sub;
                    }
                }catch (e) {
                    if (foo !== '_trackException') {
                        _gas.push(['_trackException', e]);
                    }
                }
            }
        }

        // Call internal GAS functions
        if (hasOwn.call(_gas._functions, foo)) {
            try {
                _gas._functions[foo].apply(_gas.gh, sub);
            }catch (e) {
                if (foo !== '_trackException') {
                    _gas.push(['_trackException', e]);
                }
            }
        }
        // Intercept _setAccount calls
        // TODO use == instead of indexOf
        if (foo === '_setAccount') {
            acct_name = acct_name || String(_gas._accounts_length + 1);
            _gas._accounts[acct_name] = sub[0];
            _gas._accounts_length++;
            return _gaq.push([acct_name + '.' + foo, sub[0]]);
        }

        // Call Original _gaq, for all accounts
        var acc_foo;
        var return_val;
        for (i in _gas._accounts) {
            if (hasOwn.call(_gas._accounts, i)) {
                acc_foo = i + '.' + foo;
                args = sub.slice();
                args.unshift(acc_foo);
                //console.log(args);
                return_val += _gaq.push(args);
            }
        }
        //FIXME return_val is NaN sometimes
        return return_val ? 1 : 0;
    }
};

// Everything pushed to _gas is in fact pushed back to _gaq
_gas.push = function() {
    (function(args) {
        _gaq.push(function() {
            _gas._push_inner.apply(_gas, args);
        });
    })(arguments);
};

/*!
 * GAS - Google Analytics on Steroids
 * Helper Functions
 *
 * Copyright 2011, Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardo.cereto@directperformance.com.br>
 * @version $Revision$
 *
 * $Date$
 */

var gas_helpers = {};

gas_helpers['_sanitizeString'] = function(str) {
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
    return str;
};

gas_helpers['_addEventListener'] = function(obj, evt, fnc) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fnc, false);
        return true;
    } else if (obj.attachEvent) {
        return obj.attachEvent('on' + evt, fnc);
    }
    else {
        obj['on' + evt] = fnc;
    }
};

_gas.push(function() {
    function extend(obj) {
        for (var i in obj) {
            if (!(i in this)) {
                this[i] = obj[i];
            }
        }
    }

    var tracker = _gat._createTracker();

    // Extend Tracker
    extend.call(tracker, gas_helpers);

    _gas.gh = tracker;

});

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


if (typeof _gas._functions === 'undefined') {
    _gas._functions = {};
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
            this._addEventListener(el, 'click', tag_element);
        }
        else {
            //Text field
            this._addEventListener(el, 'change', tag_element);
        }
    }
    this._addEventListener(form, 'submit', tag_element);
}

_gas._functions._trackForms = function() {
    for (var i in document.forms) {
        track_form.call(this, document.forms[i]);
    }
};

/*!
 * GAS - Google Analytics on Steroids
 * Max Scroll Tracking Plugin
 *
 * Copyright 2011, Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardo.cereto@directperformance.com.br>
 * @version $Revision$
 *
 * Based on http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
 *
 * $Date$
 */

if (typeof _gas._functions === 'undefined') {
    _gas._functions = {};
}

function get_window_size() {
    var myWidth = 0, myHeight = 0;
    if (typeof(window.innerWidth) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (
        document.documentElement &&
        (
            document.documentElement.clientWidth ||
            document.documentElement.clientHeight
        )
    ) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (
        document.body &&
        (
            document.body.clientWidth ||
            document.body.clientHeight
        )
    ) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }

    return [myWidth, myHeight];
}

function get_window_scroll() {
    var scrOfX = 0, scrOfY = 0;
    if (typeof(window.pageYOffset) == 'number') {
        //Netscape compliant
        scrOfY = window.pageYOffset;
        scrOfX = window.pageXOffset;
    } else if (
        document.body &&
        (
            document.body.scrollLeft ||
            document.body.scrollTop
        )
    ) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
        scrOfX = document.body.scrollLeft;
    } else if (
        document.documentElement &&
        (
            document.documentElement.scrollLeft ||
            document.documentElement.scrollTop
        )
    ) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
        scrOfX = document.documentElement.scrollLeft;
    }
    return [scrOfX, scrOfY];
}

function get_doc_height() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}


function get_scroll_percentage() {
    return ((
        get_window_scroll()[1] +
        get_window_size()[1]

    ) / (
        get_doc_height()
    )) * 100;
}

var t = null;
var max_scroll = 0;
function update_scroll_percentage() {
    if (t) {
        clearTimeout(t);
    }
    t = setTimeout(function() {
        max_scroll = get_scroll_percentage();
    }, 400);
}


function track_max_scroll() {
    this._addEventListener(window, 'beforeunload', function() {
        var bucket = Math.floor(max_scroll / 10) * 10;
        if (bucket < 100) {
            var bucket = String(bucket) + '-' + String(bucket + 9);
        }

        _gas.push(['_trackEvent',
            'Max Scroll',
            document.location.href,
            String(bucket),
            Math.round(max_scroll)
        ]);
    });

}

_gas._functions['_trackMaxSrcoll'] = function() {
    this._addEventListener(window, 'scroll', update_scroll_percentage);
    track_max_scroll.call(this);
};

/*!
 * Wrap-up
 */
// Execute previous functions
while (_gas._queue.length > 0) {
    _gas.push(_gas._queue.shift());
}

// Import ga.js
if (_gaq && _gaq.length >= 0) {
    (function() {
            var ga = document.createElement('script');
            ga.type = 'text/javascript';
            ga.async = true;
            ga.src = (
                'https:' == document.location.protocol ?
                    'https://ssl' :
                    'http://www'
            ) +
                '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s);
    })();
}

})(window);
