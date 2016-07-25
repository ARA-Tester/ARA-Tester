import * as React from 'react';
import OptionalStyleProp from './../../OptionalStyleProp';
import DeepContentBox from './../../DeepContentBox';
import SimpleListItem from './../../SimpleListItem';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import AraTesterAxisCurrentPosition from './../AraTesterAxisCurrentPosition';

export default class AraTesterPositions extends React.Component<OptionalStyleProp, void> {
    public render(): JSX.Element {
        return (
            <DeepContentBox style={this.props.style}>
                <List>
                    <SimpleListItem>
                        <AraTesterAxisCurrentPosition axisId={0} axisName="X" />
                    </SimpleListItem>
                    <Divider />
                    <SimpleListItem>
                        <AraTesterAxisCurrentPosition axisId={0} axisName="X" />
                    </SimpleListItem>
                    <Divider />
                    <SimpleListItem>
                        <AraTesterAxisCurrentPosition axisId={0} axisName="X" />
                    </SimpleListItem>
                    <Divider />
                    <SimpleListItem>
                        <AraTesterAxisCurrentPosition axisId={0} axisName="X" />
                    </SimpleListItem>
                </List>
            </DeepContentBox>
        );
    }
}