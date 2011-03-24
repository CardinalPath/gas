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

_gas._execute = function() {
    console.dir(arguments);
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
// So Helpers are ready for hooks 
_gas.push = function() {
    (function(args) {
        _gaq.push(function() {
            _gas._execute.apply(_gas, args);
        });
    })(arguments);
};

