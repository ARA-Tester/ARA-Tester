import * as Path from 'path';
import * as Hapi from 'hapi';
import * as Inert from 'inert';
import * as Mongoose from 'mongoose';
import AraTesterAxisController from './controllers/AraTesterAxisController';

Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://localhost:27017/AraTester');

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

server.register(Inert, () => {});
server.route({
    method: 'GET',
    path: '/{file*}',
    handler: {
        directory: {
            path: '.',
        }
    }
});

server.start((err: any) => {
    if (err) {
        throw err;
    } else {
        console.log('Server running at:', server.info.uri);
    }
});

/*

let axis: AraTesterAxisController = new AraTesterAxisController(0);
axis.autoConfigurate().then(() => {
    axis.movment({
        direction: false,
        distance: 20
    }).then((count: number) => {
        console.log("Counter: " + count);
        axis.release();
    }).catch((err: NodeJS.ErrnoException) => console.log("Error: " + JSON.stringify(err)));
}, (err: any) => {
    throw err;
});*/
