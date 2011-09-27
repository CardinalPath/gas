/**
 * Hook to sanity check trackEvents
 *
 * The value is rounded and parsed to integer.
 * Negative values are sent as zero.
 * If val is NaN than it is sent as zero.
 */
_gas.push(['_addHook', '_trackEvent', function() {
    var args = slice.call(arguments);
    if (args[3]) {
        args[3] = (args[3] < 0 ? 0 : Math.round(args[3])) || 0;
    }
    return args;
}]);

