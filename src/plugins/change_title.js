/**
 * Enables setting of page Title on _trackPageview.
 *
 * This Hook cancels the execution of the current pageview and fires a new one.
 * for this reason this hook must be inserted early on the hook list,
 * so other hooks don't fire twice.
 */
_gas.push(['_addHook', '_trackPageview', function(url, title) {
    if (title && typeof title === 'string') {
        var oTitle = document.title;
        window._gas.push(
            function() {document.title = title;},
            ['_trackPageview', url],
            function() {document.title = oTitle;}
        );
        return false;
    }
    return [url];
}]);

