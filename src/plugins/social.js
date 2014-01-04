// refractor of http://goo.gl/3ejQan
/*global FB, unescape, twttr*/

// Original Copyright: 2012 Google Inc. All Rights Reserved.

/**
 * @fileoverview A simple script to automatically track Facebook and Twitter
 * buttons using Google Analytics social tracking feature.
 * @author api.nickm@gmail.com (Nick Mihailovski)
 * @author api.petef@gmail.com (Pete Frisella)
 * @adaptated-by tomfuertes@gmail.com (Tom Fuertes)
 */


/**
 * Extracts a query parameter value from a URI.
 * @param {string} uri The URI from which to extract the parameter.
 * @param {string} paramName The name of the query paramater to extract.
 * @return {string} The un-encoded value of the query paramater. undefined
 *     if there is no URI parameter.
 * @private
 */
var extractParamFromUri_ = function (uri, paramName) {
	if (!uri) {
		return;
	}
	var regex = new RegExp('[\\?&#]' + paramName + '=([^&#]*)');
	var params = regex.exec(uri);
	if (params) {
		return unescape(params[1]);
	}
	return;
};


/**
 * Tracks Facebook likes, unlikes and sends by suscribing to the Facebook
 * JSAPI event model. Note: This will not track facebook buttons using the
 * iframe method.
 */
var trackFacebook = function () {
	try {
		FB.Event.subscribe('edge.create', function (opt_target) {
			_gas.push(['_trackSocial', 'facebook', 'like', opt_target]);
		});
		FB.Event.subscribe('edge.remove', function (opt_target) {
			_gas.push(['_trackSocial', 'facebook', 'unlike', opt_target]);
		});
		FB.Event.subscribe('message.send', function (opt_target) {
			_gas.push(['_trackSocial', 'facebook', 'send', opt_target]);
		});
	} catch (e) {}
};


/**
 * Handles tracking for Twitter click and tweet Intent Events which occur
 * everytime a user Tweets using a Tweet Button, clicks a Tweet Button, or
 * clicks a Tweet Count. This method should be binded to Twitter click and
 * tweet events and used as a callback function.
 * Details here: http://dev.twitter.com/docs/intents/events
 * @param {object} intent_event An object representing the Twitter Intent Event
 *     passed from the Tweet Button.
 * @private
 */
var trackTwitterHandler_ = function (intent_event) {
	var opt_target; //Default value is undefined
	if (intent_event && intent_event.type === 'tweet' ||
		intent_event.type === 'click') {
		if (intent_event.target.nodeName === 'IFRAME') {
			opt_target = extractParamFromUri_(intent_event.target.src, 'url');
		}
		var socialAction = intent_event.type + ((intent_event.type === 'click') ?
			'-' + intent_event.region : ''); //append the type of click to action
		_gaq.push(['_trackSocial', 'twitter', socialAction, opt_target]);
	}
};

/**
 * Binds Twitter Intent Events to a callback function that will handle
 * the social tracking for Google Analytics. This function should be called
 * once the Twitter widget.js file is loaded and ready.
 */
var trackTwitter = function () {
	//bind twitter Click and Tweet events to Twitter tracking handler
	try {
		twttr.events.bind('click', trackTwitterHandler_);
		twttr.events.bind('tweet', trackTwitterHandler_);
	} catch (e) {}
};

var _trackSocial = function () {
	setTimeout(function () {
		trackTwitter();
		trackFacebook();
	}, 3000);
};

_gas.push(['_addHook', '_gasTrackSocial', _trackSocial]);
