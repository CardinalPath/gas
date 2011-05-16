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
 * _getLinkerUrl Hook to use stored allowAnchor value.
 */
_gas.push(['_addHook', '_getLinkerUrl', function(url, use_anchor) {
    if (use_anchor === undefined) {
        use_anchor = _gas._allowAnchor;
    }
    return [url, use_anchor];
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
        i, el;
    if (event_used !== 'now' || event_used !== 'mousedown') {
        event_used = 'click';
    }
    for (i = 0; i < document.links.length; i++) {
        el = document.links[i];
        if (el.href.indexOf('http') == 0) {
            // Check to see if it's a internal link
            if (el.hostname == internal) {
                continue;
            }
            // Tag external Links either now or on mouse event.
            if (el.hostname in _external_domains) {
                if (event_used === 'now') {
                    el.href = this._getLinkerUrl(el.href, _gas._allowAnchor);
                }else {
                    this._addEventListener(el, event_used, function() {
                        this.href = this._getLinkerUrl(
                            this.href,
                            _gas._allowAnchor
                        );
                    });
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
_gas.push(['_setMultiDomain', 'now']);
