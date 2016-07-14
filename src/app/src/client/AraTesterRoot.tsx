import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AraTesterWrapper from './AraTesterWrapper';
const { div, link } = React.DOM;

export default class AraTesterRoot extends React.Component<void, void> {
    public render(): JSX.Element {
        return (
            <MuiThemeProvider>
                <div>
                    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,500" rel="stylesheet" type="text/css"/>
                    <AraTesterWrapper axisId={0} />
                </div>
            </MuiThemeProvider>
        );
    }
}