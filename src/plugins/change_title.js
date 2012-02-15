/**
 * This is kept just for backward compatibility since it's now supported
 * natively in _gaq.
 */
_gas.push(['_addHook', '_trackPageview', function(url, title) {
    var obj = url;
    if (typeof url === 'string' && typeof title === 'string') {
        obj = {
            'page': url,
            'title': title
        };
    }
    return [obj];
}]);

