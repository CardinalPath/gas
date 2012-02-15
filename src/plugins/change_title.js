/**
 * This is kept just for backward compatibility since it's now supported
 * natively in _gaq.
 */
_gas.push(['_addHook', '_trackPageview', function() {
    var args = slice.call(arguments);
    if (args.length >= 2 &&
        typeof args[0] === 'string' && typeof args[1] === 'string')
    {
        return [{
            'page': args[0],
            'title': args[1]
        }];
    }
    return args;
}]);

