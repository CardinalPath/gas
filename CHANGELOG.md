GAS Changelog
=============

1.11.0
------
- Display Advertising (dc.js) support (9d4bb3e)
- Build system moved to Grunt (f3921fc)
- Removed _sanitizeString helper function (e042350)
- Outbound events are non-interactive now (9585c4e)
- Allow negative event values (ce4515c)
- Don't push GAS functions inside _gaq. (18c5e79)
- Extra checks on the live handler, fixes issue with ie8 (ae1d554) 

1.10.1
------
- Experimental Support for `_gasMeta`, `_gasMetaEcommerce` and
`_gasHTMLMarkup`.

1.10
----
- Fixed bug with Youtube Tracking #29.

1.6.0
-----
- fixed #16 API changed to make it more clear when we're calling GAS functions.

1.4.0
-----

- fixed #4 Use live Bindings for most plugins
- fixed #1 Permits multiple invocations of all plugins without causing double tracking.
- fixed #12 New plugin to track mailto: links. `_gas.push(['_trackMailto']);`
- Uses uglifyjs to compile code. Less variable mangling.

1.2.1
-----

- HotFix to fix form tracking bug when a form had fieldsets. Only triggered while not using the 'live' mode.
