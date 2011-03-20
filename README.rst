.. -*- restructuredtext -*-

.. _README:

==================================
GAS - Google Analytics on Steroids
==================================

.. _gas-synopsis:

GAS is a wrapper around the Google Analytics Tracking API from Google. It tries
to add new functionality while keeping the same API.

GAS is not an official Google library and GAS developers are not affiliated 
with Google.

.. contents::
   :local:

.. _gas-installation:
Installation
------------

To install GAS download the script from Download_ Page and put it somewhere on
your website. Also install the basic snippet on everypege of your website. Be
sure to change the Account Number (UA) and the correct gas.js file location.

.. _Download: https://bitbucket.org/dpc/gas/downloads

The basic snippet looks like this:
.. code-block:: javascript

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

GAS is based on _gaq from Google and as such supports all ethods and directives
it supports. So go check `oficcial documentation`__ for the GA Tracker.

.. __: http://code.google.com/apis/analytics/docs/gaJS/gaJSApi.html

Additionally GAS support a couple more features.

.. _gas-license:
License
-------

This software is licensed under the `MIT License`. See the ``LICENSE``
file in the top distribution directory for the full license text.

