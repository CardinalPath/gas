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

To install GAS download the script from dist_ folder and put it somewhere on
your website. Also install the basic snippet on every page of your website. Be
sure to change the Account Number (UA) and the correct gas.js file location.

.. _dist: https://github.com/CardinalPath/gas/tree/master/dist

The basic snippet looks like this:

::

    <script type="text/javascript">
    var _gas = _gas || [];
    _gas.push(['_setAccount', 'UA-YYYYYY-Y']); // REPLACE WITH YOUR GA NUMBER
    _gas.push(['_setDomainName', '.mydomain.com']); // REPLACE WITH YOUR DOMAIN
    _gas.push(['_trackPageview']);
    _gas.push(['_trackForms']);
    _gas.push(['_trackOutboundLinks']);
    _gas.push(['_trackMaxScroll']);
    _gas.push(['_trackDownloads']);
    _gas.push(['_trackYoutube', 'force']);
    _gas.push(['_trackVimeo', 'force']);
    
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
That snippet will enable the common features of GAS.

.. _gas-doc:

Documentation
-------------

GAS is based on _gaq from Google and as such supports all methods and 
directives it supports. So go check `official documentation`__ for the GA 
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
or to trigger events to another tool every time a pageView is fired. You can
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
page. This may be helpful for sites in asp, where lowercase and uppercase
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
    _gas.push(['_setAllowLinker', true]);
    _gas.push(['_setDomainName', 'mysite.com']);
    _gas.push(['_setDomainName', 'myothersite.com']);
    _gas.push(['_setMultiDomain', 'click']);

The above snippet can be used in either ``mysite.com`` or ``myothersite.com``. 
It will know the right one to use for each case and all other domains pushed to
``_setDomainName`` will be used to discover links between the sites. 
The nice side effect is that you can have the same snippet for both websites.


Max-Scroll Tracking
~~~~~~~~~~~~~~~~~~~

This will fire events with the Max-Scroll percentage value for every page the
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

GAS support changing the page title.

::

    _gas.push(['_trackPageview', {
        page: '/my_page', 
        title: 'My Page Title'
    }]);



Multi-Account Tracking
~~~~~~~~~~~~~~~~~~~~~~

Easier handling of multi-account setups. You can fire an event to all accounts
or just to one of the accounts you configured,

::

    _gas.push(['_setAccount', 'UA-XXXXX-1']);
    _gas.push(['_setAccount', 'UA-XXXXX-2']);
    _gas.push(['custom._setAccount', 'UA-XXXXX-3']);

    // This will be sent to all 3 accounts
    _gas.push(['_trackPageview']);

    // This pageview goes only to account UA-XXXXX-3
    _gas.push(['custom._trackPageview']);


Download Tracking
~~~~~~~~~~~~~~~~~
To enable Download Tracking just include the following call on your snippet.

::

    _gas.push(['_trackDownloads']);

GAS will track the following extensions by default:
'xls,xlsx,doc,docx,ppt,pptx,pdf,txt,zip,rar,7z,exe,wma,mov,avi,wmv,mp3,csv,tsv'

You can set additional extensions to be tracked if you want by passing a 
parameter to `_trackDownloads`.

::

    _gas.push(['_trackDownloads', 'torrent,gz,mp4,wav']);



Vimeo Video Tracking
~~~~~~~~~~~~~~~~~~~~
You can track Vimeo_ video events. You must be using the iframe method 
of embedding videos. 

The browser must support HTML5 postMessage. That means it won't work on ie6 
and ie7.

::

    _gas.push(['_trackVimeo', 'force']);

After you enable it the following events will be tracked. 

 * play
 * pause
 * finish

You should append to the video URL the parameter `api=1`. 
The embedding code should look like this:

::

    <iframe id="player_1" src="http://player.vimeo.com/video/7100569?api=1" width="540" height="304" frameborder="0" webkitallowfullscreen></iframe> 

If you don't provide the `api` parameter than GAS will *force* a reload on the 
iframe adding this parameter. 

If you only want to track some videos (not all) on your site you can omit the 
`'force'` parameter and GAS will only track the Videos that already have the api 
parameter.
Then you can enable this parameter only in the videos you want to track.



.. _Vimeo: http://www.vimeo.com/

Youtube Video Tracking
~~~~~~~~~~~~~~~~~~~~~~
You can track Youtube_ video events. You must be using the iframe method 
of embedding videos. 

The browser must support HTML5 postMessage. That means it won't work on ie6 
and ie7.

::

    _gas.push(['_trackYoutube', 'force']);

After you enable it the following events will be tracked. 

 * play
 * pause
 * finish
 * error

You should append to the video URL the parameter `enablejsapi=1`. 
The embedding code should look like this:

::

    <iframe width="640" height="510" src="http://www.youtube.com/embed/u1zgFlCw8Aw?enablejsapi=1" frameborder="0" allowfullscreen></iframe>

If you don't provide the `enablejsapi` parameter than GAS will *force* a 
reload on the iframe adding this parameter. 

If you only want to track some videos (not all) on your site you can omit the 
`'force'` parameter and GAS will only track the Videos that already have the 
`enablejsapi` parameter.
Then you can enable this parameter only in the videos you want to track.

_trackYoutube also support a second optional parameter. It should be an Array of integers and define percentages to fire an event at:

::
    
    _gas.push(['_trackYoutube', 'force', [25, 50, 75, 90]]);

This will setup Youtube Video Tracking so that events will be fired at 25%, 50%, 75% and 90% in addition to the other standard events, 'play', 'pause', 'finish', ...

.. _Youtube: http://www.youtube.com/


.. _gas-license:

License
-------

Copyright (C) 2011 by Cardinal Path and Direct Performance

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

