# http://code.google.com/closure/compiler/
#CLOSURE_COMPILER = java -jar ~/compiler.jar
#CLOSURE_COMPILER = java -jar ~/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS
#CLOSURE_COMPILER = java -jar ~/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --formatting PRETTY_PRINT
CLOSURE_COMPILER = java -jar ~/compiler.jar --formatting PRETTY_PRINT

# http://code.google.com/closure/utilities/index.html
CLOSURE_LINTER = gjslint
FIXJSSTYLE = fixjsstyle

JSFILES = src/core.js src/helpers.js $(wildcard src/plugins/*.js) src/wrapup.js

.DEFAULT_GOAL := all

all: gas.js gas.min.js

gas.js: $(JSFILES)
	# for debugging
	# grep "console" $^
	echo "(function(window, undefined) {" > dist/$@
	cat $^ >> dist/gas.js
	echo "})(window);" >> dist/$@
	$(CLOSURE_LINTER) dist/$@

gas.min.js: gas.js
	$(CLOSURE_COMPILER) --js dist/gas.js --js_output_file dist/$@

lint: $(JSFILES)
	$(FIXJSSTYLE) -r src
	$(CLOSURE_LINTER) -r src

