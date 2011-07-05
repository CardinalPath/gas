(function(window, undefined) {
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

/*!
 * GAS - Google Analytics on Steroids
 * Helper Functions
 *
 * Copyright 2011, Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 * @version $Revision$
 *
 * $Date$
 */

var gas_helpers = {};

/**
 * Removes special characters and Lowercase String
 *
 * @param {string} str to be sanitized.
 * @param {boolean} strict_opt If we should remove any non ascii char.
 * @return {string} Sanitized string.
 */
gas_helpers['_sanitizeString'] = function(str, strict_opt) {
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

    if (strict_opt) {
        str = str.replace(/[^a-z0-9_-]/g, '_');
    }
    return str.replace(/_+/g, '_');
};

/**
 * Cross Browser helper to addEventListener.
 *
 * ga_next.js currently have a _addEventListener directive. So _gas will
 * allways prefer that if available, and will use this one only as a fallback
 *
 * @param {HTMLElement} obj The Element to attach event to.
 * @param {string} evt The event that will trigger the binded function.
 * @param {function(event)} ofnc The function to bind to the element.
 * @param {boolean} bubble true if event should be fired at bubble phase.
 * Defaults to false. Works only on W3C compliant browser. MSFT don't support
 * it.
 * @return {boolean} true if it was successfuly binded.
 */
gas_helpers['_addEventListener'] = function(obj, evt, ofnc, bubble) {
    var fnc = function(event) {
        event = event || window.event;
        ofnc.call(this, event);
    };
    // W3C model
    if (bubble === undefined) {
        bubble = false;
    }
    if (obj.addEventListener) {
        obj.addEventListener(evt, fnc, !!bubble);
        return true;
    }
    // Microsoft model
    else if (obj.attachEvent) {
        return obj.attachEvent('on' + evt, fnc);
    }
    // Browser don't support W3C or MSFT model, go on with traditional
    else {
        evt = 'on' + evt;
        if (typeof obj[evt] === 'function') {
            // Object already has a function on traditional
            // Let's wrap it with our own function inside another function
            fnc = (function(f1, f2) {
                return function() {
                    f1.apply(this, arguments);
                    f2.apply(this, arguments);
                }
            })(obj[evt], fnc);
        }
        obj[evt] = fnc;
        return true;
    }
};

// This function is the first one pushed to _gas, so it creates the _gas.gh
//     object. It needs to be pushed into _gaq so that _gat is available when
//     it runs.
window._gas.push(function() {
    var tracker = _gat._getTrackerByName();

    // Extend helpers with the tracker;
    gas_helpers.tracker = tracker;

    window._gas.gh = gas_helpers;

});

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

/*!
 * GAS - Google Analytics on Steroids
 * Max Scroll Tracking Plugin
 *
 * Copyright 2011, Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 * @version $Revision$
 *
 * Based on http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
 *
 * $Date$
 */

/**
 * Get current windows width and heigtht
 *
 * @return {Array.<number>} [width,height].
 */
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

/**
 * Get current absolute window scroll position
 *
 * @return {Array.<number>} [XScroll,YScroll].
 */
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

/**
 * Get current absolute document height
 *
 * @return {number} Current document height.
 */
function get_doc_height() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}


/**
 * Get current vertical scroll percentage
 *
 * @return {number} Current vertical scroll percentage.
 */
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
function update_scroll_percentage(now) {
    if (t) {
        clearTimeout(t);
    }
    if (now === true) {
        max_scroll = Math.max(get_scroll_percentage(), max_scroll);
        return;
    }
    t = setTimeout(function() {
        max_scroll = Math.max(get_scroll_percentage(), max_scroll);
    }, 400);
}


function track_max_scroll() {
    this._addEventListener(window, 'beforeunload', function() {
        update_scroll_percentage(true);
        var bucket = Math.floor(max_scroll / 10) * 10;
        if (bucket < 100) {
            var bucket = String(bucket) + '-' + String(bucket + 9);
        }

        _gas.push(['_trackEvent',
            'Max Scroll',
            url,
            String(bucket),
            Math.round(max_scroll)
        ]);
    });

}

_gas.push(['_addHook', '_trackMaxSrcoll', function() {
    this._addEventListener(window, 'scroll', update_scroll_percentage);
    track_max_scroll.call(this);
}]);

/*!
 * GAS - Google Analytics on Steroids
 * Multi-Domain Tracking Plugin
 *
 * Copyright 2011, Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 * @version $Revision$
 *
 * $Date$
 */

/**
 * Private variable to store allowAnchor choice
 */
_gas._allowAnchor = false;

/**
 * _setAllowAnchor Hook to store choice for easier use of Anchor
 *
 * This stored value is used on _getLinkerUrl, _link and _linkByPost so it's
 * used the same by default
 */
_gas.push(['_addHook', '_setAllowAnchor', function(val) {
    _gas._allowAnchor = val;
}]);

/**
 * _link Hook to use stored allowAnchor value.
 */
_gas.push(['_addHook', '_link', function(url, use_anchor) {
    if (use_anchor === undefined) {
        use_anchor = _gas._allowAnchor;
    }
    return [url, use_anchor];
}]);

/**
 * _linkByPost Hook to use stored allowAnchor value.
 */
_gas.push(['_addHook', '_linkByPost', function(url, use_anchor) {
    if (use_anchor === undefined) {
        use_anchor = _gas._allowAnchor;
    }
    return [url, use_anchor];
}]);

/**
 * Store all domains pushed by _setDomainName that don't match current domain.
 *
 * @type {Array.<string>}
 */
var _external_domains = [];

/**
 * Store the internal domain name
 *
 * @type string
 */
var _internal_domain = undefined;

/**
 * _setDomainName Hook to add pushed domains to _external_domains if it doesn't
 * match current domain.
 *
 * This Hook let you call _setDomainName multiple times. So _gas will only
 * apply the one that matches the current domain and the other ones will be
 * used to track external domains with cookie data.
 */
_gas.push(['_addHook', '_setDomainName', function(domainName) {
    if (document.location.hostname.indexOf(domainName) < 0) {
        _external_domains.push(domainName);
        return false;
    }
    _internal_domain = domainName;
}]);

/**
 * _addExternalDomainName Hook.
 *
 * This hook let you add external domains so that urls on current page to this
 * domain are marked to send cookies.
 * You should use _setDomainName for this in most of the cases.
 */
_gas.push(['_addHook', '_addExternalDomainName', function(domainName) {
    _external_domains.push(domainName);
    return false;
}]);

/**
 * Function to mark links on the current pages to send links
 *
 * This function is used to make it easy to implement multi-domain-tracking.
 * @param {string} event_used Should be 'now', 'click' or 'mousedown'. Default
 * 'click'.
 * @this _gas.gh GAS Helper functions
 * @return {boolean} Returns false to avoid this is puhed to _gaq.
 */
function track_links(event_used) {
    var internal = document.location.hostname,
        gh = this,
        i, j, el;
    if (event_used !== 'now' && event_used !== 'mousedown') {
        event_used = 'click';
    }
    for (i = 0; i < document.links.length; i++) {
        el = document.links[i];
        if (el.href.indexOf('http') == 0) {
            // Check to see if it's a internal link
            if (el.hostname == internal ||
              el.hostname.indexOf(_internal_domain) >= 0) {
                continue;
            }
            // Tag external Links either now or on mouse event.
            for (j = 0; j < _external_domains.length; j++) {
                if (el.hostname.indexOf(_external_domains[j]) >= 0) {
                    if (event_used === 'now') {
                        el.href = gh.tracker._getLinkerUrl(
                            el.href,
                            _gas._allowAnchor
                        );
                    }else {
                        if (event_used === 'click') {
                            this._addEventListener(el, event_used, function(e) {
                                _gas.push(
                                    ['_link', this.href, _gas._allowAnchor]
                                );
                                e.preventDefault();
                                return false;
                            });
                        }else {
                            this._addEventListener(el, event_used, function() {
                                this.href = gh.tracker._getLinkerUrl(
                                    this.href,
                                    _gas._allowAnchor
                                );
                            });
                        }
                    }
                }
            }
        }
    }
    return false;
}

/**
 * Registers Hook to _setMultiDomain
 */
_gas.push(['_addHook', '_setMultiDomain', track_links]);

/**
 * Enable Multidomain Tracking.
 *
 * It will look for all links inside the page that matches one of the
 * _external_domains and will mark that link to be tagged
 */
//_gas.push(['_setMultiDomain', 'mousedown']);
/*!
 * Wrap-up
 */
// Execute previous functions
while (window._gas._queue.length > 0) {
    window._gas.push(window._gas._queue.shift());
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
