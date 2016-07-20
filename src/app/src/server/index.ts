import * as Path from 'path';
import * as Hapi from 'hapi';
import * as Inert from 'inert';
import * as Nes from 'nes';
import * as Mongoose from 'mongoose';
import * as Ip from 'ip';
import AraTesterAxisController from './controllers/AraTesterAxisController';
import AraTesterAxisId from './../share/AraTesterAxisId';
import AraTesterAxisDistance from './../share/AraTesterAxisDistance';

Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://localhost:27017/AraTester');

let axis: AraTesterAxisController = new AraTesterAxisController(0);

let server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, '../public')
            }
        }
    }
});

server.connection({
    port: 3000
});

server.register(Inert, () => {
    server.route({
        method: 'GET',
        path: '/{file*}',
        handler: {
            directory: {
                path: '.',
            }
        }
    });
});

server.register(Nes, (regErr: any) => {
    if(regErr) {
        throw regErr;
    } else {
        let wsServer: Nes.Server = server as Nes.Server;
        wsServer.subscription('/AraTesterAxisOnMovmentStart/{id}');
        wsServer.subscription('/AraTesterAxisOnMovmentEnd/{id}');

        AraTesterAxisController.onMovmentStart = (id: AraTesterAxisId, position: AraTesterAxisDistance): void => {
            wsServer.publish(`/AraTesterAxisOnMovmentStart/${id.axisId}`, position);
        };

        AraTesterAxisController.onMovmentEnd = (id: AraTesterAxisId, position: AraTesterAxisDistance): void => {
            wsServer.publish(`/AraTesterAxisOnMovmentEnd/${id.axisId}`, position);
        };

        wsServer.route({
            method: 'GET',
            path: '/AraTesterAxisGetConfiguration/{id}',
            config: {
                handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                    reply(axis.getConfiguration());
                }
            }
        });

        wsServer.route({
            method: 'PATCH',
            path: '/AraTesterAxisSaveConfiguration/{id}',
            config: {
                handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                    axis.update(request.payload);
                    reply({});
                }
            }
        });

        wsServer.route({
            method: 'POST',
            path: '/AraTesterAxisMovment/{id}',
            config: {
                handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                    let tBefore: Date = new Date();
                    axis.movment(request.payload).then((count: number) => {
                        console.log("Time elapsed in MS: " + ((new Date()).getTime() - tBefore.getTime()));
                        console.log("------------------------------------------------------------");
                    }).catch((err: NodeJS.ErrnoException) => {
                        console.log("Error: " + JSON.stringify(err));
                    });
                    reply({});
                }
            }
        });

        wsServer.route({
            method: 'GET',
            path: '/AraTesterAxisStop/{id}',
            config: {
                handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                    axis.stop();
                    reply({});
                }
            }
        });

        wsServer.route({
            method: 'POST',
            path: '/AraTesterAxisMoveAuto/{id}',
            config: {
                handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                    axis.moveAuto(request.payload.direction);
                    reply({});
                }
            }
        });

        wsServer.route({
            method: 'GET',
            path: '/AraTesterAxisStopAuto/{id}',
            config: {
                handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                    axis.stopAuto();
                    reply({});
                }
            }
        });

        wsServer.route({
            method: 'GET',
            path: '/AraTesterAxisGetPosition/{id}',
            config: {
                handler: (request: Hapi.Request, reply: Hapi.IReply) => {
                    reply(axis.getPosition());
                }
            }
        });
    }
});

axis.autoConfigurate().then(() => {
    server.start((err: any) => {
        if (err) {
            throw err;
        } else {
            console.log(`Server running at: http://${Ip.address()}:${server.info.port}`);
        }
    });
}).catch((configErr: any) => {
    throw configErr;
});
