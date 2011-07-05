/*!
 * GAS - Google Analytics on Steroids v0.1
 *
 * @preserve Copyright 2011, Cardinal Path
 * @preserve Copyright 2011, Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 * @version $Revision$
 *
 * $Date$
 */

/**
 * Google Analytics original _gaq.
 *
 * This never tries to do something that is not supposed to. So it won't break
 * in the future.
 */
window['_gaq'] = window['_gaq'] || [];

var _prev_gas = window['_gas'] || [];

// Avoid duplicate definition
if (_prev_gas._accounts_length >= 0) {
    return;
}

//Shortcuts, these speed up the code
var document = window.document,
    toString = Object.prototype.toString,
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
window['_gas'] = {
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
window._gas._hooks['_addHook'] = [function(fn, cb) {
    if (typeof fn === 'string' && typeof cb === 'function') {
        if (typeof window._gas._hooks[fn] === 'undefined') {
            window._gas._hooks[fn] = [];
        }
        window._gas._hooks[fn].push(cb);
    }
    return false;
}];

/**
 * Construct the correct account name to be used on _gaq calls.
 *
 * The account name for the first unamed account pushed to _gas is the standard
 * account name. It's pushed without the account name to _gaq, so if someone
 * calls directly _gaq it works as expected.
 * @param {string} acct Account name.
 * @return {string} Correct account name to be used already with trailling dot.
 */
function _build_acct_name(acct) {
    return acct === '_gas1' ? '' : acct + '.';
}

function _gaq_push(arr) {
    if (_gas.debug_mode) {
        console.log(arr);
    }
    return window._gaq.push(arr);
}

/**
 * Everything pushed to _gas is executed by this call.
 *
 * This function should not be called directly. Instead use _gas.push
 * @return {number} This is the same return as _gaq.push calls.
 */
window._gas._execute = function() {
    var args = slice.call(arguments),
        sub = args.shift(),
        gaq_execute = true,
        i, foo, hooks, acct_name, repl_sub;

    if (typeof sub === 'function') {
        // Pushed functions are executed right away
        return _gaq_push(
            (function(s) {
                return function() {
                    // pushed functions receive helpers through this object
                    s.call(window._gas.gh);
                };
            })(sub)
        );

    }else if (typeof sub === 'object' && sub.length > 0) {
        foo = sub.shift();

        if (foo.indexOf('.') >= 0) {
            acct_name = foo.split('.')[0];
            foo = foo.split('.')[1];
        }else {
            acct_name = undefined;
        }

        // Execute hooks
        hooks = window._gas._hooks[foo];
        if (hooks && hooks.length > 0) {
            for (i = 0; i < hooks.length; i++) {
                try {
                    repl_sub = hooks[i].apply(window._gas.gh, sub);
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
                        window._gas.push(['_trackException', e]);
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
            acct_name = acct_name || '_gas' +
                String(window._gas._accounts_length + 1);
            // Force that the first unamed account is _gas1
            if (typeof window._gas._accounts['_gas1'] == 'undefined' &&
                acct_name.indexOf('_gas') != -1) {
                acct_name = '_gas1';
            }
            window._gas._accounts[acct_name] = sub[0];
            window._gas._accounts_length += 1;
            acct_name = _build_acct_name(acct_name);
            return _gaq_push([acct_name + foo, sub[0]]);
        }

        // If user provides account than trigger event for just that account.
        var acc_foo;
        if (acct_name && window._gas._accounts[acct_name]) {
            acc_foo = _build_acct_name(acct_name) + foo;
            args = slice.call(sub);
            args.unshift(acc_foo);
            return _gaq_push(args);
        }

        // Call Original _gaq, for all accounts
        var return_val = 0;
        for (i in window._gas._accounts) {
            if (hasOwn.call(window._gas._accounts, i)) {
                acc_foo = _build_acct_name(i) + foo;
                args = slice.call(sub);
                args.unshift(acc_foo);
                return_val += _gaq_push(args);
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
window._gas.push = function() {
    var args = slice.call(arguments);
    for (var i = 0; i < args.length; i++) {
        (function(arr) {
            _gaq.push(function() {
                window._gas._execute.call(window._gas.gh, arr);
            });
        })(args[i]);
    }
};

/**
 * Hook for _trackExceptions
 *
 * Watchout for circular calls
 */
window._gas.push(['_addHook', '_trackException', function(exception, message) {
    window._gas.push(['_trackEvent',
        'Exception ' + (exception.name || 'Error'),
        message || exception.message || exception,
        url
    ]);
    return false;
}]);

/**
 * Hook to enable Debug Mode
 */
window._gas.push(['_addHook', '_setDebug', function(set_debug) {
    window._gas.debug_mode = !!set_debug;
}]);

/**
 * Hook to Remove other Hooks
 *
 * It will remove the last inserted hook from a _gas function.
 *
 * @param {string} func _gas Function Name to remove Hooks from.
 * @return {boolean} Always returns false.
 */
window._gas.push(['_addHook', '_popHook', function(func) {
    var arr = window._gas._hooks[func];
    if (arr && arr.pop) {
        arr.pop();
    }
    return false;
}]);

