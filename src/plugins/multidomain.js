/**
 * GAS - Google Analytics on Steroids
 *
 * Multi-Domain Tracking Plugin
 *
 * Copyright 2011, Cardinal Path and Direct Performance
 * Licensed under the MIT license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
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
    _gas._allowAnchor = !!val;
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
    if (sindexOf.call('.' + document.location.hostname, domainName) < 0) {
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
 * @this {GasHelper} GAS Helper functions
 * @return {boolean} Returns false to avoid this is puhed to _gaq.
 */
function track_links(event_used) {
    if (!this._multidomainTracked) {
        this._multidomainTracked = true;
    }else {
        //Oops double tracking detected.
        return;
    }
    var internal = document.location.hostname,
        gh = this,
        i, j, el,
        links = document.getElementsByTagName('a');
    if (event_used !== 'now' && event_used !== 'mousedown') {
        event_used = 'click';
    }
    for (i = 0; i < links.length; i++) {
        el = links[i];
        if (sindexOf.call(el.href, 'http') === 0) {
            // Check to see if it's a internal link
            if (el.hostname == internal ||
              sindexOf.call(el.hostname, _internal_domain) >= 0) {
                continue;
            }
            // Tag external Links either now or on mouse event.
            for (j = 0; j < _external_domains.length; j++) {
                if (sindexOf.call(el.hostname, _external_domains[j]) >= 0) {
                    if (event_used === 'now') {
                        el.href = gh['tracker']['_getLinkerUrl'](
                            el.href,
                            _gas._allowAnchor
                        );
                    }else {
                        if (event_used === 'click') {
                            this._addEventListener(el, event_used, function(e) {
                                _gas.push(
                                    ['_link', this.href, _gas._allowAnchor]
                                );
                                if (e.preventDefault)
                                    e.preventDefault();
                                else
                                    e.returnValue = false;
                                return false; //needed for ie7
                            });
                        }else {
                            this._addEventListener(el, event_used, function() {
                                this.href = gh['tracker']['_getLinkerUrl'](
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
_gas.push(['_addHook', '_setMultiDomain', function() {
    var gh = this;
    var args = slice.call(arguments);
    gh._DOMReady(function() {
        track_links.apply(gh, args);
    });
}]);

