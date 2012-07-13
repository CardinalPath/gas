UGLIFYJS = uglifyjs --ascii -v 
JSHINT = jshint

COREJSFILES = src/helpers.js src/core.js
PLUGINS = $(wildcard src/plugins/*.js)
WRAPUP = src/wrapup.js
JSFILES = $(COREJSFILES) $(PLUGINS) $(WRAPUP)
TESTFILES = $(wildcard test/test_*.js)

.DEFAULT_GOAL := all

all: gas.js gas.core.js gas.min.js gas.core.min.js

gas.js: $(JSFILES)
	# for debugging
	# grep "console" $^
	cat src/header.js > dist/$@
	echo "(function(window, undefined) {" >> dist/$@
	cat $^ >> dist/$@
	echo "})(window);" >> dist/$@

gas.core.js: $(COREJSFILES) $(WRAPUP)
	cat src/header.js > dist/$@
	echo "(function(window, undefined) {" >> dist/$@
	cat $^ >> dist/$@
	echo "})(window);" >> dist/$@

gas.min.js: gas.js
	$(UGLIFYJS) -o dist/$@ dist/$<

gas.core.min.js: gas.core.js
	$(UGLIFYJS) -o dist/$@ dist/$<

lint: $(JSFILES)
	$(JSHINT) src/

