import * as Path from 'path';
import * as Hapi from 'hapi';
import * as Inert from 'inert';

let server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
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