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


(function(window, undefined) {

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


var _gas = {
    _accounts: {},
    _accounts_length: 0,
    _hooks: {},
    //_plugins: {},
    _functions: {},
    _queue: _prev_gas
};

_gas._functions._addHook = function(fn, cb) {
    if (typeof fn === 'string' && typeof cb === 'function') {
        if (typeof this._hooks[fn] === 'undefined') {
            this._hooks[fn] = [];
        }
        this._hooks[fn].push(cb);
    }
};

// Watchout for circular calls
_gas._functions._trackException = function(exception, message) {
    _gas.push(['_trackEvent',
        'Exception ' + (exception.name || 'Error'),
        message || exception.message || exception,
        url
    ]);
}

_gas.push = function() {
    var args = slice.call(arguments),
        sub = args.shift(),
        i, foo, hooks, acct_name;

    if (typeof sub === 'function') {
        // Pushed functions are executed right away
        return sub.call(_gas);

    }else if (typeof sub === 'object' && sub.length > 0) {
        foo = sub.shift();

        if (indexOf.call(foo, '.') >= 0) {
            acct_name = foo.split('.')[0];
            foo = foo.split('.')[1];
        }

        // Execute hooks
        hooks = this._hooks[foo];
        if (hooks && hooks.length > 0) {
            for (i = 0; i < hooks.length; i++) {
                try {
                    hooks[i].apply(null, sub);
                }catch (e) {
                    if (foo !== '_trackException') {
                        _gas.push(['_trackException', e]);
                    }
                }
            }
        }

        // Call internal GAS functions
        if (hasOwn.call(this._functions, foo)) {
            try {
                this._functions[foo].apply(this, sub);
            }catch (e) {
                if (foo !== '_trackException') {
                    _gas.push(['_trackException', e]);
                }
            }
        }
        // Intercept _setAccount calls
        // TODO use == instead of indexOf
        if (foo === '_setAccount') {
            acct_name = acct_name || String(this._accounts_length + 1);
            this._accounts[acct_name] = sub[0];
            this._accounts_length++;
            return _gaq.push([acct_name + '.' + foo, sub[0]]);
        }

        // Call Original _gaq, for all accounts
        var acc_foo;
        for (i in this._accounts) {
            if (hasOwn.call(this._accounts, i)) {
                acc_foo = i + '.' + foo;
                args = sub.slice();
                args.unshift(acc_foo);
                //console.log(args);
                _gaq.push(args);
            }
        }
    }
};

window._gas = _gas;

})(window);

