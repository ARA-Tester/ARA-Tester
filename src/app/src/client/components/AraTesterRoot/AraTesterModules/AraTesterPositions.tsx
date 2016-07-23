import * as React from 'react';
import OptionalStyleProp from './../../OptionalStyleProp';
import DeepContentBox from './../../DeepContentBox';
import { Flex, Item } from 'react-flex';
import 'react-flex/index.css';
import AraTesterAxisCurrentPosition from './../AraTesterAxisCurrentPosition';

export default class AraTesterModules extends React.Component<OptionalStyleProp, void> {
    public render(): JSX.Element {
        return (
            <DeepContentBox style={this.props.style}>
                <Flex column justifyContent="space-around" alignContent="space-around" alignItems="center">
                    <Item flex>
                        <AraTesterAxisCurrentPosition axisId={0} axisName="X" />
                    </Item>
                    <Item flex>
                        <AraTesterAxisCurrentPosition axisId={0} axisName="X" />
                    </Item>
                    <Item flex>
                        <AraTesterAxisCurrentPosition axisId={0} axisName="X" />
                    </Item>
                    <Item flex>
                        <AraTesterAxisCurrentPosition axisId={0} axisName="X" />
                    </Item>
                </Flex>
            </DeepContentBox>
        );
    }
}