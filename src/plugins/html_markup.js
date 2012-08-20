/**
 * GAS - Google Analytics on Steroids
 *
 * HTML Markup Plugin
 *
 * Copyright 2012, Cardinal Path and Direct Performance
 * Licensed under the GPLv3 license.
 *
 * @author Eduardo Cereto <eduardocereto@gmail.com>
 */

/**
 * Sets Default pagename and Custom Vars based on Meta
 *
 * If a meta name='ga_vpv' is availalbe on the page use that as a page
 * replacement if the pageview is not passed as parameter.
 *
 * If meta name="ga_custom_var" the 4 values for a custom var must be on
 * content separated by a caret (^).
 */
function _gasMeta() {
    var i, meta,
        metas = document.getElementsByTagName('meta');
    for (i = 0; i < metas.length; i++) {
        if (metas[i].name === 'ga_vpv') {
            // Fire transaction
            meta = metas[i].content;
            window._gas.push(['_addHook', '_trackPageview', function (p) {
                if (p === undefined) {
                    return [meta];
                }
            }]);
            return;
        } else if (metas[i].name === 'ga_custom_var') {
            meta = metas[i].content.split('^');
            if (meta.length === 4) {
                window._gas.push(['_setCustomVar',
                    parseInt(meta[0], 10),
                    meta[1],
                    meta[2],
                    parseInt(meta[3], 10)
                ]);
            }
        }
    }
}

/**
 * Listens to all clicks and looks for a tagged element on it.
 *
 * Events have the following params:
 *   x-ga-event-category (required) – The category of the event specified in
 * the solution design document
 *   x-ga-event-action (required) – The action of the event specified in the
 * solution design document
 *   x-ga-event-label (optional) – The label of the event specified in the
 * solution design document.  If no label is specified in the solution design
 * document, this attribute can be omitted
 *   x-ga-event-value (optional) – The value (integer) of the event specified
 * in the solution design document.  If no value is specified in the solution
 * design document, this attribute can be omitted
 *   x-ga-event-noninteractive (optional) – Boolean (true/false) value
 * specified in the solution design document.  If the non-interactive value is
 * not specified, this attribute can be omitted
 *
 * Social Actions have the following params:
 *   x-ga-social-network (required) – The network of the social interaction
 * specified in the solution design document
 *   x-ga-social-action (required) – The action of the social interaction
 * specified in the solution design document
 *   x-ga-social-target (optional) – The target of the social interaction
 * specified in the solution design document.  If no target is specified, this
 * attribute can be omitted
 *   x-ga-social-pagepath (optional) – The page path of the social interaction
 * specified in the solution design document.  If no page path is specified,
 * this attribute can be omitted
 */
function _gasHTMLMarkup() {
    var gh = this;

    gh._addEventListener(document, 'mousedown', function (me) {
        var el;
        for (el = me.target; el.nodeName !== 'HTML';
             el = el.parentNode) {
            if (el.getAttribute('x-ga-event-category')) {
                // Event element clicked, fire the _trackEvent
                window._gas.push(['_trackEvent',
                  el.getAttribute('x-ga-event-category'),
                  el.getAttribute('x-ga-event-action'),
                  el.getAttribute('x-ga-event-label') || undefined,
                  parseInt(el.getAttribute('x-ga-event-value'), 10) || 0,
                  el.getAttribute('x-ga-event-noninteractive') === 'true' ? true : undefined
                ]);
            }
            if (el.getAttribute('x-ga-social-network')) {
                // Social Action Clicked fire _trackSocial
                window._gas.push(['_trackSocial',
                  el.getAttribute('x-ga-social-network'),
                  el.getAttribute('x-ga-social-action'),
                  el.getAttribute('x-ga-social-target') || undefined,
                  el.getAttribute('x-ga-social-pagepath') || undefined
                ]);
            }

            if (el.parentNode === null) {
                break;
            }
        }
    }, true);
}

_gas.push(['_addHook', '_gasMeta', _gasMeta]);
_gas.push(['_addHook', '_gasHTMLMarkup', _gasHTMLMarkup]);

