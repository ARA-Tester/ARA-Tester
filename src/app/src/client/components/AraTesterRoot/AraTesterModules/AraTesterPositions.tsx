import * as React from 'react';
import OptionalStyleProp from './../../OptionalStyleProp';
import DeepContentBox from './../../DeepContentBox';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import AraTesterAxisCurrentPosition from './../AraTesterAxisCurrentPosition';

export default class AraTesterModules extends React.Component<OptionalStyleProp, void> {
    public render(): JSX.Element {
        return (
            <DeepContentBox style={this.props.style}>
                <List>
                    <ListItem disabled>
                        <AraTesterAxisCurrentPosition axisId={0} axisName="X" />
                    </ListItem>
                    <Divider />
                    <ListItem disabled>
                        <AraTesterAxisCurrentPosition axisId={0} axisName="X" />
                    </ListItem>
                    <Divider />
                    <ListItem disabled>
                        <AraTesterAxisCurrentPosition axisId={0} axisName="X" />
                    </ListItem>
                    <Divider />
                    <ListItem disabled>
                        <AraTesterAxisCurrentPosition axisId={0} axisName="X" />
                    </ListItem>
                </List>
            </DeepContentBox>
        );
    }
}