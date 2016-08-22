import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import AppSocket from './services/AppSocket';
import AraTesterRoot from './components/AraTesterRoot/AraTesterRoot';

function bootstrap(): void {
    let bootstrapNode = document.createElement('div');
    ReactDOM.render(<AraTesterRoot />, bootstrapNode);
    document.body.appendChild(bootstrapNode);
    socket.onError((err: any) => {
        if((err !== undefined) && (err !== null)) {
            console.log(JSON.stringify(err));
        }
    });
}

let socket: AppSocket = AppSocket.getSocket();
injectTapEventPlugin();
socket.connect().then(bootstrap);