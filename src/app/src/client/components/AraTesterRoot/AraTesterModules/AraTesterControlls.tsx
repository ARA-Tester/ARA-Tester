import * as React from 'react';
import AraTesterAutoMovmentButton from './AraTesterAutoMovmentButton';
import DeepContentBox from './../../DeepContentBox';
import AraTesterControllsProps from './../../OptionalStyleProp';
import AraTesterControllsState from './../../../../share/AraTesterAxisDistance';
import MovmentIcon from 'material-ui/svg-icons/action/open-with';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { TouchTapEvent } from 'material-ui';
import { Flex, Item } from 'react-flex';
import 'react-flex/index.css';

const movmentButtonStyle: React.CSSProperties = {
    margin: 5
};

export default class AraTesterControlls extends React.Component<AraTesterControllsProps, AraTesterControllsState> {
    public onDistanceChange: (event: TouchTapEvent, index: number, menuItemValue: number) => void;

    public constructor(props: AraTesterControllsProps) {
        super(props);
        this.state = { distance: 0.05 };
        this.onDistanceChange = this.handleDistanceChange.bind(this);
    }

    public handleDistanceChange(event: TouchTapEvent, index: number, menuItemValue: number): void {
        this.setState({ distance: menuItemValue });
    }

    public render(): JSX.Element {
        return (
            <DeepContentBox style={this.props.style}>
                <Flex column justifyContent="space-around" alignContent="space-around" alignItems="center">
                    <Item flex>
                        <SelectField
                            floatingLabelText="Select movment distance step"
                            value={this.state.distance}
                            onChange={this.onDistanceChange}
                            style={movmentButtonStyle}>
                                <MenuItem value={5} primaryText="long" />
                                <MenuItem value={0.5} primaryText="medium" />
                                <MenuItem value={0.05} primaryText="short" />
                        </SelectField>
                    </Item>
                    <Item flex>
                        <Flex row justifyContent="space-around" alignContent="space-around" alignItems="center">
                            <Item flex>
                                <AraTesterAutoMovmentButton axisId={0} movment="rotate left" distance={this.state.distance} style={movmentButtonStyle} />
                            </Item>
                            <Item flex>
                                <AraTesterAutoMovmentButton axisId={0} movment="forward" distance={this.state.distance} style={movmentButtonStyle} />
                            </Item>
                            <Item flex>
                                <AraTesterAutoMovmentButton axisId={0} movment="up" distance={this.state.distance} style={movmentButtonStyle} />
                            </Item>
                        </Flex>
                    </Item>
                    <Item flex>
                        <Flex row justifyContent="space-around" alignContent="space-around" alignItems="center">
                            <Item flex>
                                <AraTesterAutoMovmentButton axisId={0} movment="left" distance={this.state.distance} style={movmentButtonStyle} />
                            </Item>
                            <Item flex>
                                <RaisedButton disabled={true} icon={<MovmentIcon />} style={movmentButtonStyle} />
                            </Item>
                            <Item flex>
                                <AraTesterAutoMovmentButton axisId={0} movment="right" distance={this.state.distance} style={movmentButtonStyle} />
                            </Item>
                        </Flex>
                    </Item>
                    <Item flex>
                        <Flex row justifyContent="space-around" alignContent="space-around" alignItems="center">
                            <Item flex>
                                <AraTesterAutoMovmentButton axisId={0} movment="down" distance={this.state.distance} style={movmentButtonStyle} />
                            </Item>
                            <Item flex>
                                <AraTesterAutoMovmentButton axisId={0} movment="backward" distance={this.state.distance} style={movmentButtonStyle} />
                            </Item>
                            <Item flex>
                                <AraTesterAutoMovmentButton axisId={0} movment="rotate right" distance={this.state.distance} style={movmentButtonStyle} />
                            </Item>
                        </Flex>
                    </Item>
                </Flex>
            </DeepContentBox>
        );
    }
}