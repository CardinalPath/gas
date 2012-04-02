GAS Changelog
=============

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
