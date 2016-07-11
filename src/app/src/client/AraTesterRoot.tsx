import * as React from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AraTesterConfig from './AraTesterConfig';
const { DOM, Component } = React;
const { div, link } = DOM;

export default class AraTesterRoot extends Component<{}, {}> {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div>
                    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,500" rel="stylesheet" type="text/css"/>
                    <AraTesterConfig
                        pulseWidth={500}
                        tMax={5000000}
                        tMin={500000}
                        tDelta={100}
                        configured={6400}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}