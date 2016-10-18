# ara-modules-tester
Automaic modules tester for [ARA](https://atap.google.com/ara/)

This project is with status: ***freezed until ARA project is resumed*** ...

Some of technologies, frameworks and libraries that the project uses:

- Linux device driver
- Make
- Node
- TypeScript
- MongoDB
- Mongoose
- hapi
- nes
- React
- material-ui
- WebSocket
- webpack
- electron

Project structure:

- `src/driver` - contains the developed device driver for controlling CNC motors, acessor of [cnc-controller](https://github.com/NoHomey/cnc-controller)
- `src/app/src/share` - contains common code base share across the server, client and deskptop app, mainly TypeScript types
- `src/app/src/server` - contains the server ran on the Raspberry Pi, uses hapi and nes (WebSocket based server)
- `src/app/src/client` - contains common code base share between the cleint and the desktop app, uses React and material-ui (SPA, uses WebSocket to communicate with the server)
- `src/app/src/app` - contatins desktop specific files for configuring and starting the app, it is electron based desktop app and it is auto started after boot
