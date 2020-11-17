# ara-modules-tester
Automaic modules tester for [Project ARA](https://atap.google.com/ara/)

This project is with status: ***freezed until ARA project is resumed*** ...

Some of technologies, frameworks and libraries that the project uses:

- [Linux device driver](/src/driver)
- [Make](https://www.gnu.org/software/make/)
- [Node](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V6.md#6.9.0)
- [TypeScript](https://github.com/Microsoft/TypeScript)
- [MongoDB](https://github.com/mongodb/mongo)
- [Mongoose](https://github.com/Automattic/mongoose)
- [hapi](https://github.com/hapijs/hapi)
- [nes](https://github.com/hapijs/nes)
- [React](https://github.com/facebook/react)
- [material-ui](https://github.com/callemall/material-ui)
- [WebSocket](https://github.com/webpack/webpack)
- [webpack](https://github.com/webpack/webpack)
- [electron](https://github.com/electron/electron)

Project structure:

- `src/driver` - contains the developed device driver for controlling CNC motors, acessor of [cnc-controller](https://github.com/NoHomey/cnc-controller)
- `src/app/src/share` - contains common code base shared across the server, client and deskptop app, mainly TypeScript `interface`s and `type`s
- `src/app/src/server` - contains the server ran on the controller, uses hapi and nes (WebSocket based server)
- `src/app/src/client` - contains common code base share between the cleint and the desktop app, uses React and material-ui (SPA, uses WebSocket to communicate with the server)
- `src/app/src/app` - contatins desktop specific files for configuring and starting the app, it is electron based desktop app and it is auto started after boot
