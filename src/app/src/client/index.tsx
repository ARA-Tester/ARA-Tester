import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import AppSocket from './services/AppSocket';
import AraTesterRoot from './components/AraTesterRoot/AraTesterRoot';

function bootstrap(): void {
    let bootstrapNode = document.createElement('div');
    ReactDOM.render(<AraTesterRoot />, bootstrapNode);
    document.body.appendChild(bootstrapNode);
}

let socket: AppSocket = AppSocket.getSocket();
socket.onError((err: any) => {
    if((err !== undefined) && (err !== null)) {
        console.log(JSON.stringify(err));
    }
});
injectTapEventPlugin();
socket.connect().then(bootstrap);