# http://code.google.com/closure/compiler/
#CLOSURE_COMPILER = java -jar ~/compiler.jar
CLOSURE_COMPILER = java -jar ~/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS
#CLOSURE_COMPILER = java -jar ~/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --formatting PRETTY_PRINT
#CLOSURE_COMPILER = java -jar ~/compiler.jar --formatting PRETTY_PRINT
UGLIFYJS = uglifyjs --ascii -v 

# http://code.google.com/closure/utilities/index.html
CLOSURE_LINTER = gjslint
FIXJSSTYLE = fixjsstyle

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
	# $(CLOSURE_LINTER) dist/$@

gas.core.js: $(COREJSFILES) $(WRAPUP)
	cat src/header.js > dist/$@
	echo "(function(window, undefined) {" >> dist/$@
	cat $^ >> dist/$@
	echo "})(window);" >> dist/$@
	# $(CLOSURE_LINTER) dist/$@

gas.min.js: gas.js
	#$(CLOSURE_COMPILER) --js dist/$< --js_output_file dist/$@
	$(UGLIFYJS) -o dist/$@ dist/$<

gas.core.min.js: gas.core.js
	#$(CLOSURE_COMPILER) --js dist/$< --js_output_file dist/$@
	$(UGLIFYJS) -o dist/$@ dist/$<

lint: $(JSFILES)
	$(FIXJSSTYLE) -r src
	$(CLOSURE_LINTER) -r src
	$(FIXJSSTYLE) $(TESTFILES)
	$(CLOSURE_LINTER) $(TESTFILES)

