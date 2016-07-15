__npm_bin__ = ./node_modules/.bin
__ioctl_enum__ = ARA_TESTER.ts

all: clean
	g++ -std=c++11 ./src/ioctl_export.cc
	./a.out
	mv __ioctl_enum__ ./src
	$(__npm_bin__)/tsc
	node ./src/index.js

install:
	npm install
	$(__npm_bin__)/typings install

client:
	rm -Rf ./public
	$(__npm_bin__)/webpack

server:
	rm -Rf ./deploy
	$(__npm_bin__)/tsc -p ./src/server

start: client server
	mv ./public ./deploy
	node deploy/index.js 
	
clean:
	rm -f ./a.out *.js ./src/__ioctl_enum__