# http://code.google.com/closure/compiler/
CLOSURE_COMPILER = java -jar ~/compiler.jar

# http://code.google.com/closure/utilities/index.html
CLOSURE_LINTER = gjslint

.DEFAULT_GOAL := all

all: gas min


# for debugging
gas: src/conf.js src/core.js
	# grep "console" $^
	cat $^ > dist/gas.js

min: gas
	CLOSURE_COMPILER --js dist/gas.js --js_output_file dist/gas.min.js

lint: src/conf.js src/core.js
	CLOSURE_LINTER -r src


