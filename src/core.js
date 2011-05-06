/*!
 * GAS - Google Analytics on Steroids v0.1
 *
 * @preserve Copyright 2011, Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardo.cereto@directperformance.com.br>
 * @version $Revision$
 *
 * $Date$
 */


var document = window.document;

/**
 * Google Analytics original _gaq.
 *
 * This never tries to do something that is not supposed to. So it won't break
 * in the future.
 */
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


/**
 * _gas main object.
 *
 * It's supposed to be used just like _gaq but here we extend it. In it's core
 * everything pushed to _gas is run through possible hooks and then pushed to
 * _gaq
 */
window._gas = {
    _accounts: {},
    _accounts_length: 0,
    _hooks: {},
    _queue: _prev_gas,
    gh: {}
};

/**
 * First standard Hook that is responsible to add next Hooks
 *
 * _addHook calls always reurn false so they don't get pushed to _gaq
 * @param {string} fn The function you wish to add a Hook to.
 * @param {function()} cb The callback function to be appended to hooks.
 * @return {boolean} Always false.
 */
_gas._hooks['_addHook'] = [function(fn, cb) {
    if (typeof fn === 'string' && typeof cb === 'function') {
        if (typeof _gas._hooks[fn] === 'undefined') {
            _gas._hooks[fn] = [];
        }
        _gas._hooks[fn].push(cb);
    }
    return false;
}];

/**
 * Everything pushed to _gas is executed by this call.
 *
 * This function should not be called directly. Instead use _gas.push
 * @return {number} This is the same return as _gaq.push calls.
 */
_gas._execute = function() {
    //console.dir(arguments);
    var args = slice.call(arguments),
        sub = args.shift(),
        gaq_execute = true,
        i, foo, hooks, acct_name, repl_sub;

    if (typeof sub === 'function') {
        // Pushed functions are executed right away
        return _gaq.push(
            (function(s) {
                var f = function() {
                    s.call(_gas.gh);
                };
                return f;
            })(sub)
        );

    }else if (typeof sub === 'object' && sub.length > 0) {
        foo = sub.shift();

        if (indexOf.call(foo, '.') >= 0) {
            acct_name = foo.split('.')[0];
            foo = foo.split('.')[1];
        }else {
            acct_name = undefined;
        }

        // Execute hooks
        hooks = _gas._hooks[foo];
        if (hooks && hooks.length > 0) {
            for (i = 0; i < hooks.length; i++) {
                try {
                    repl_sub = hooks[i].apply(_gas.gh, sub);
                    if (repl_sub === false) {
                        // Returning false from a hook cancel the call
                        gaq_execute = false;
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
        // Cancel execution on _gaq if any hook returned false
        if (gaq_execute === false) {
            return 1;
        }
        // Intercept _setAccount calls
        if (foo === '_setAccount') {
            acct_name = acct_name || '_gas' + String(_gas._accounts_length + 1);
            _gas._accounts[acct_name] = sub[0];
            _gas._accounts_length++;
            return _gaq.push([acct_name + '.' + foo, sub[0]]);
        }

        // If user provides account than trigger event for just that account.
        var acc_foo;
        if (acct_name && _gas._accounts[acct_name]) {
            acc_foo = acct_name + '.' + foo;
            args = sub.slice();
            args.unshift(acc_foo);
            return _gaq.push(args);
        }

        // Call Original _gaq, for all accounts
        var return_val = 0;
        for (i in _gas._accounts) {
            if (hasOwn.call(_gas._accounts, i)) {
                acc_foo = i + '.' + foo;
                args = sub.slice();
                args.unshift(acc_foo);
                //console.log(args);
                return_val += _gaq.push(args);
            }
        }
        return return_val ? 1 : 0;
    }
};

/**
 * Standard method to execute GA commands.
 *
 * Everything pushed to _gas is in fact pushed back to _gaq. So Helpers are
 * ready for hooks. This creates _gaq as a series of functions that call
 * _gas._execute() with the same arguments.
 */
_gas.push = function() {
    (function(args) {
        _gaq.push(function() {
            _gas._execute.apply(_gas.gh, args);
        });
    })(arguments);
};

/**
 * Hook for _trackExceptions
 *
 * Watchout for circular calls
 */
_gas.push(['_addHook', '_trackException', function(exception, message) {
    _gas.push(['_trackEvent',
        'Exception ' + (exception.name || 'Error'),
        message || exception.message || exception,
        url
    ]);
    return false;
}]);

/**
 * Hook to Remove other Hooks
 *
 * It will remove the last inserted hook from a _gas function.
 *
 * @param {string} func _gas Function Name to remove Hooks from.
 * @return {boolean} Always returns false.
 */
_gas.push(['_addHook', '_popHook', function(func) {
    var arr = _gas._hooks[func];
    if (arr && arr.pop) {
        arr.pop();
    }
    return false;
}]);

