import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import AppSocket from './services/AppSocket';
import AraTesterRoot from './components/AraTesterRoot/AraTesterRoot';

injectTapEventPlugin();

let socket: AppSocket = AppSocket.getSocket();
let bootstrapNode = document.createElement('div');
ReactDOM.render(<AraTesterRoot />, bootstrapNode);
document.body.appendChild(bootstrapNode);
socket.onError((err: any) => {
    alert(JSON.stringify(err));
});
socket.connect();