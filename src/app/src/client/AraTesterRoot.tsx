import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AraTesterConfig from './AraTesterConfig';
const { DOM, Component } = React;
const { div, link } = DOM;

export default class AraTesterRoot extends Component<{}, {}> {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,500" rel="stylesheet" type="text/css"/>
                    <AraTesterConfig id={0} />
                </div>
            </MuiThemeProvider>
        );
    }
}