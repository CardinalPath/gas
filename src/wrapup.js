/**
 * Wrap-up
 */
// Execute previous functions
while (_gas._queue.length > 0) {
	_gas.push(_gas._queue.shift());
}

// Import ga.js
if (typeof window._gat === 'undefined') {
	(function () {
		var gasScript = document.getElementById('gas-script');
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		if (gasScript !== null && gasScript.getAttribute('data-use-dcjs') === 'true') {
			ga.src = (
				'https:' === document.location.protocol ?
				'https://' : 'http://') +
				'stats.g.doubleclick.net/dc.js';
		} else {
			ga.src = (
				'https:' === document.location.protocol ?
				'https://ssl' : 'http://www') +
				'.google-analytics.com/ga.js';
		}
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	}());
}
