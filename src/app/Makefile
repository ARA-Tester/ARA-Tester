__npm_bin__ = ./node_modules/.bin
__ioctl_enum__ = ARA_TESTER.tsc

all: start

install:
	npm install
	$(__npm_bin__)/typings install

client:
	rm -Rf ./public
	$(__npm_bin__)/webpack

server:
	rm -Rf ./deploy
	g++ -std=c++11 ./src/server/exportIoctls.cc
	./a.out
	rm ./a.out
	mv __ioctl_enum__ ./src/server
	$(__npm_bin__)/tsc -p ./src/server

start: client server
	mv ./public ./deploy
	node deploy/server/index.js 
	
clean:
	rm -f ./a.out *.js ./src/__ioctl_enum__