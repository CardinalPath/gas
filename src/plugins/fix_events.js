/**
 * Hook to sanity check trackEvents
 *
 * The value is rounded and parsed to integer.
 * Negative values are sent as zero.
 * If val is NaN than it is sent as zero.
 */
_gas.push(['_addHook', '_trackEvent', function(cat, act, lab, val) {
    if (val) {
        val = (val < 0 ? 0 : Math.round(val)) || 0;
    }
    return [cat, act, lab, val];
}]);

