__npm_bin__ = ./node_modules/.bin
__ioctl_enum__ = ARA_TESTER.ts

all: clean start

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
	mv $(__ioctl_enum__) ./src/server
	$(__npm_bin__)/tsc -p ./src/server

app: client
	rm -Rf ./app
	mkdir ./app
	mv ./public/index.html ./app
	mv ./public/main.js ./app
	rm -R ./public
	$(__npm_bin__)/tsc -p ./src/app
	mv ./src/app/index.js ./app

start: client server
	mv ./public ./deploy
	node deploy/server/index.js

electron: app
	cd ./app && npm install electron-prebuilt
	cp ./src/app/app.desktop /home/pi/Desktop/AraTester.desktop
	rm -Rf /home/pi/.AraTesterApp
	mv ./app /home/pi/.AraTesterApp
	
clean:
	rm -f -R ./deploy ./app
	find ./src -name "*.js" -type f -delete
	rm -f ./src/server/$(__ioctl_enum__)
