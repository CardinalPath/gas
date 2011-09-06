/**
 * Hook to sanity check trackEvents
 *
 * The value is rounded and parsed to integer.
 */
window._gas.push(['_addHook', '_trackEvent', function(cat, act, lab, val) {
    if (val) {
        val = Math.abs(Math.round(val)) || 0;
    }
    return [cat, act, lab, val];
}]);

