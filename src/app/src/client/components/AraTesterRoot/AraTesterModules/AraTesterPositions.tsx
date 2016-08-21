import * as React from 'react';
import StyleProp from './../../StyleProp';
import DeepContentBox from './../../DeepContentBox';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import AraTesterAxisCurrentPosition from './../AraTesterAxisCurrentPosition';

const { div } =React.DOM;

export default class AraTesterPositions extends React.Component<StyleProp, void> {
    public shouldComponentUpdate(props: StyleProp, state: void): boolean {
        return false;
    }

    public render(): JSX.Element {
        return (
            <DeepContentBox style={this.props.style}>
                <List>
                    <div>
                        <AraTesterAxisCurrentPosition axisId={0} axisName="X" />
                    </div>
                    <Divider />
                    <div>
                        <AraTesterAxisCurrentPosition axisId={0} axisName="X" />
                    </div>
                    <Divider />
                    <div>
                        <AraTesterAxisCurrentPosition axisId={0} axisName="X" />
                    </div>
                    <Divider />
                    <div>
                        <AraTesterAxisCurrentPosition axisId={0} axisName="X" />
                    </div>
                </List>
            </DeepContentBox>
        );
    }
}