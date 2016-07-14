import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import AraTesterRoot from './AraTesterRoot';

injectTapEventPlugin();
let bootstrapNode = document.createElement('div');
ReactDOM.render(<AraTesterRoot />, bootstrapNode);
document.body.appendChild(bootstrapNode);