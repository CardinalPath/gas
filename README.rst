.. -*- restructuredtext -*-

.. _README:

==================================
GAS - Google Analytics on Steroids
==================================

.. _gas-synopsis:

Synopsis
--------

GAS is a wrapper around the Google Analytics Tracking API from Google. It tries
to add new functionality while keeping the same API.

GAS is not an official Google library and GAS developers are not affiliated 
with Google.

.. _gas-installation:

Installation
------------

To install GAS download the script from Download_ Page and put it somewhere on
your website. Also install the basic snippet on everypege of your website. Be
sure to change the Account Number (UA) and the correct gas.js file location.

.. _Download: https://bitbucket.org/dpc/gas/downloads

The basic snippet looks like this:

::

    <script type="text/javascript">
    var _gas = _gas || [];
    _gas.push(['_setAccount', 'UA-YYYYYY-Y']);
    _gas.push(['_trackPageview', '/test']);
    _gas.push(['_trackForms']);
    
    (function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = '/gas.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
    })();
    </script> 
    

There's no need to include the ga.js file. GAS will load that file for you.

.. _gas-doc:

Documentation
-------------

GAS is based on _gaq from Google and as such supports all methods and 
directives it supports. So go check `oficcial documentation`__ for the GA 
Tracker.

.. __: http://code.google.com/apis/analytics/docs/gaJS/gaJSApi.html

Additionally GAS support a couple more features.

Form Tracking
~~~~~~~~~~~~~

Form Tracking will trigger events every time a user submits a form or changes a
form field.

::

    _gas.push(['_trackForms']);

This is all you need to enable it.

Hooks for _gaq Functions
~~~~~~~~~~~~~~~~~~~~~~~~

Hooks are a handy feature if you want to monitor or change values of a call to
one of the function from _gaq. You can use it as a filter to lowercase values,
or to trigger events to another tool evrytime a pageView is fired. You can
assign multiple Hooks.

::

    _gas.push(['_addHook', '_trackPageview', function(page){
        console.log(page);
        if(page.toLowerCase){
            page = page.toLowerCase();
        }
        return [page]
    }]);
    _gas.push(['_trackPageview', '/Home.aspx']);

The above Hook will print the pushed page to the browser console and will
return the page lowercased. So the actual value sent to GA is the lowercased
page. This may be helpfull for sites in asp, where lowercase and uppercase
don't matter and will save you the work for creating a GA profile Filter.

Here's another handy Hook for Events. Event values must always be integer
values. The Hook bellow will try to round floats or convert strings to integers
when possible. This should avoid a bad value from canceling the Event.

::

    _gas.push(['_addHook', '_trackEvent', function(cat,act,lab,val){
        if(typeof val == 'string'){
            val = parseInt(val, 10);
        }
        val = Math.round(val);
        return [cat, act, lab, val]
    }]);


You can also cancel a call returning ``false`` from a Hook.

::

    _gas.push(['_addHook', '_setVar', function(val){
        _gas.push(['_setCustomVar', 1, 'userType', val, 1]);
        return false;
    }]);

The above Hook will intercept and cancel any call to the, now deprecated, 
``_setVar``. It will then trigger a call to ``_setCustomVar`` with an
equivalent value.

Multi-domain setup helpers
~~~~~~~~~~~~~~~~~~~~~~~~~~

This feature help you implementing Multi-domain setups. It will find and tag
all links to other domains and mark them with the ``_link`` or ``_linkByPost``
function. You just need to push all domain names with _setDomainName. 

::

    _gas.push(['_setAccount', 'UA-XXXXX-1']);
    _gas.push(['_setDomainName', 'mysite.com']);
    _gas.push(['_setDomainName', 'myothersite.com']);
    _gas.push(['_setMultiDomain', 'click']);

The above snippet can be used in either ``mysite.com`` or ``myothersite.com``. 
It will know the right one to use for each case and all other domains pushed to
``_setDomainName`` will be used to discover links between the sites. 
The nice side effect is that you can have the same snippet for both websites.


Max-Scroll Tracking
~~~~~~~~~~~~~~~~~~~

This will fire events with the Max-Scroll porcentage value for evey page the
user views.

::

    _gas.push(['_trackMaxScroll']);
    

Outbound Link Tracking
~~~~~~~~~~~~~~~~~~~~~~

This function will look for any outbound links on the current page and will
trigger an event when the link is clicked. It bounds to the `mousedown` 
javascript event

::

    _gas.push(['_trackOutboundLinks']);

Changing the Page Title
~~~~~~~~~~~~~~~~~~~~~~~ 

GAS supports a second optional parameter to the _trackPageview that parameter
is sent to Google Analytics as the page title. If you don't provide this 
parameter the default is to use the currnt page title.

::

    _gas.push(['_trackPageview', '/my_page', 'My Page Title']);



Multi-Account Tracking
~~~~~~~~~~~~~~~~~~~~~~

Easyier handling of multi-account setups. You can fire an event to all accounts
or just to one of the accounts you configured,

::

    _gas.push(['_setAccount', 'UA-XXXXX-1']);
    _gas.push(['_setAccount', 'UA-XXXXX-2']);
    _gas.push(['custom._setAccount', 'UA-XXXXX-3']);

    // This will be sent to all 3 accounts
    _gas.push(['_trackPageview']);

    // This pageview goes only to account UA-XXXXX-3
    _gas.push(['custom._trackPageview']);


.. _gas-license:

Vimeo Vido Trackig
~~~~~~~~~~~~~~~~~~
You can track `Vimeo`_vimeo video events. You must be using the iframe method 
of embeding videos. After you enable it the following events will be tracked. 

 * play
 * pause
 * finish

You must append to the video url the parameters `api=1&player_id=XXX` replace 
`XXX` with a descriptive id for this video. The player_id will be sent to Google
Analytics as the event label.

.. _vimeo: http://www.vimeo.com/



::

    _gas.push(['_trackVimeo']);

License
-------

This software is licensed under the `MIT License`. See the ``LICENSE``
file in the top distribution directory for the full license text.

