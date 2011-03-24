/*!
 * GAS - Google Analytics on Steroids
 * Multi-Domain Tracking Plugin
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

// Force correct use of Anchor
_gas._allowAnchor = false;
_gas.push(['_addHook', '_setAllowAnchor', function(val) {
    _gas._allowAnchor = val;
}]);

_gas.push(['_addHook', '_getLinkerUrl', function(url, use_hash) {
    if (use_hash === undefined) {
        use_hash = _gas._allowAnchor;
    }
    return [url, use_hash];
}]);


// Mark pushed DomainNames as external domains
var _external_domains = [];
_gas.push(['_addHook', '_setDomainName', function(domainName) {
    if (document.location.hostname.indexOf(domainName) < 0) {
        _external_domains.push(domainName);
        return false;
    }
}]);
_gas.push(['_addHook', '_setExternalDomainName', function(domainName) {
    _external_domains.push(domainName);
    return false;
}]);

function track_links() {
    var internal = document.location.hostname,
        i, el;
    for (i = 0; i < document.links.length; i++) {
        el = document.links[i];
        if (el.href.indexOf('http') == 0) {
            if (el.hostname == internal) {
                continue;
            }
            if (el.hostname in _external_domains) {
                el.href = this._getLinkerUrl(el.href, _gas._allowAnchor);
            }
        }
    }
}

_gas._functions['_trackMultiDomain'] = track_links;
