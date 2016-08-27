import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionViewQuilt from 'material-ui/svg-icons/action/view-quilt';
//import AraTesterModules from './AraTesterModules/AraTesterModules';
import AraTesterConfigWrapper from './AraTesterConfigWrapper/AraTesterConfigWrapper';
const { div, link } = React.DOM;

export default class AraTesterRoot extends React.Component<void, void> {
    public shouldComponentUpdate(props: void, state: void): boolean {
        return false;
    }

    public render(): JSX.Element {
        return (
            <MuiThemeProvider>
                <div>
                    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,500" rel="stylesheet" type="text/css"/>
                    <Tabs>
                        <Tab icon={<ActionViewQuilt />} label="Modules">
                            {/* <AraTesterModules /> */}
                        </Tab>
                        <Tab icon={<ActionSettings />} label="Configurate">
                            <AraTesterConfigWrapper axisId={0} positive="right" negative="left" />
                        </Tab>
                    </Tabs>
                </div>
            </MuiThemeProvider>
        );
    }
}