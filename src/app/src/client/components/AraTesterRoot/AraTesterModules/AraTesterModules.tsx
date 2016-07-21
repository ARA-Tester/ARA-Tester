import * as React from 'react';
import AraTesterAutoMovmentButton from './AraTesterAutoMovmentButton';
import DeepContentBox from './../../DeepContentBox';
import OptionalStyleProp from './../../OptionalStyleProp';
import MovmentIcon from 'material-ui/svg-icons/action/open-with';
import RaisedButton from 'material-ui/RaisedButton';
import { Flex, Item } from 'react-flex';
import 'react-flex/index.css';

const movmentButtonStyle: React.CSSProperties = {
    margin: 5
};

export default class AraTesterModules extends React.Component<OptionalStyleProp, void> {

    public render(): JSX.Element {
        return (
            <DeepContentBox style={this.props.style}>
                <Flex column justifyContent="space-around" alignContent="space-around" alignItems="center">
                    <Item flex>
                        <Flex row justifyContent="space-around" alignContent="space-around" alignItems="center">
                            <Item flex>
                                <AraTesterAutoMovmentButton axisId={0} movment="rotate left" style={movmentButtonStyle} />
                            </Item>
                            <Item flex>
                                <AraTesterAutoMovmentButton axisId={0} movment="forward" style={movmentButtonStyle} />
                            </Item>
                            <Item flex>
                                <AraTesterAutoMovmentButton axisId={0} movment="up" style={movmentButtonStyle} />
                            </Item>
                        </Flex>
                    </Item>
                    <Item flex>
                        <Flex row justifyContent="space-around" alignContent="space-around" alignItems="center">
                            <Item flex>
                                <AraTesterAutoMovmentButton axisId={0} movment="left" style={movmentButtonStyle} />
                            </Item>
                            <Item flex>
                                <RaisedButton disabled={true} icon={<MovmentIcon />} style={movmentButtonStyle} />
                            </Item>
                            <Item flex>
                                <AraTesterAutoMovmentButton axisId={0} movment="right" style={movmentButtonStyle} />
                            </Item>
                        </Flex>
                    </Item>
                    <Item flex>
                        <Flex row justifyContent="space-around" alignContent="space-around" alignItems="center">
                            <Item flex>
                                <AraTesterAutoMovmentButton axisId={0} movment="down" style={movmentButtonStyle} />
                            </Item>
                            <Item flex>
                                <AraTesterAutoMovmentButton axisId={0} movment="backward" style={movmentButtonStyle} />
                            </Item>
                            <Item flex>
                                <AraTesterAutoMovmentButton axisId={0} movment="rotate right" style={movmentButtonStyle} />
                            </Item>
                        </Flex>
                    </Item>
                </Flex>
            </DeepContentBox>
        );
    }
}