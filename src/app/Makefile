__npm_bin__ = ./node_modules/.bin

all: clean
	g++ -std=c++11 ioctl_export.cc
	./a.out
	$(__npm_bin__)/tsc
	node index.js

install:
	npm install
	$(__npm_bin__)/typings install

clean:
	rm -f ./a.out *.js ARA_TESTER.*