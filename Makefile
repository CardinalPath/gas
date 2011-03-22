# http://code.google.com/closure/compiler/
CLOSURE_COMPILER = java -jar ~/compiler.jar

# http://code.google.com/closure/utilities/index.html
CLOSURE_LINTER = gjslint

JSFILES = src/core.js $(wildcard src/plugins/*.js) src/wrapup.js

.DEFAULT_GOAL := all

all: gas min

# for debugging
gas: $(JSFILES)
	# grep "console" $^
	cat $^ > dist/gas.js

min: gas
	$(CLOSURE_COMPILER) --js dist/gas.js --js_output_file dist/gas.min.js

lint: $(JSFILES)
	$(CLOSURE_LINTER) -r src


