import * as React from 'react';
import AraTesterAutoMovmentButton from './AraTesterAutoMovmentButton';
import DeepContentBox from './../../DeepContentBox';
import SimpleListItem from './../../SimpleListItem';
import AraTesterControllsProps from './../../OptionalStyleProp';
import AraTesterControllsState from './../../../../share/AraTesterAxisDistance';
import MovmentIcon from 'material-ui/svg-icons/action/open-with';
import { ButtonSelect, SelectableButton, SelectHandler } from './../../ButtonSelect/ButtonSelect';
import RaisedButton from 'material-ui/RaisedButton';
import { TouchTapEvent } from 'material-ui';
import List from 'material-ui/List';

const movmentButtonStyle: React.CSSProperties = { margin: 5 };

export default class AraTesterControlls extends React.Component<AraTesterControllsProps, AraTesterControllsState> {
    public onDistanceSelect: SelectHandler;

    public constructor(props: AraTesterControllsProps) {
        super(props);
        this.state = { distance: 0.05 };
        this.onDistanceSelect = this.handleDistanceSelect.bind(this);
    }

    public handleDistanceSelect(select: string): void {
        this.setState({ distance: Number(select) });
    }

    public render(): JSX.Element {
        return (
            <DeepContentBox style={this.props.style}>
               <List>
                    <SimpleListItem>
                        <ButtonSelect
                            default={String(this.state.distance)}
                            onSelect={this.onDistanceSelect}
                            buttonStyle={movmentButtonStyle}
                            style={movmentButtonStyle} >
                                <SelectableButton value="5" label="long" />
                                <SelectableButton value="0.5" label="medium" />
                                <SelectableButton value="0.05" label="short" />
                        </ButtonSelect>
                    </SimpleListItem>
                    <SimpleListItem>
                        <AraTesterAutoMovmentButton axisId={0} movment="rotate left" distance={this.state.distance} style={movmentButtonStyle} />
                        <AraTesterAutoMovmentButton axisId={0} movment="forward" distance={this.state.distance} style={movmentButtonStyle} />
                        <AraTesterAutoMovmentButton axisId={0} movment="up" distance={this.state.distance} style={movmentButtonStyle} />
                    </SimpleListItem>
                    <SimpleListItem>
                        <AraTesterAutoMovmentButton axisId={0} movment="left" distance={this.state.distance} style={movmentButtonStyle} />
                        <RaisedButton disabled={true} icon={<MovmentIcon />} style={movmentButtonStyle} />
                        <AraTesterAutoMovmentButton axisId={0} movment="right" distance={this.state.distance} style={movmentButtonStyle} />
                    </SimpleListItem>
                    <SimpleListItem>
                        <AraTesterAutoMovmentButton axisId={0} movment="down" distance={this.state.distance} style={movmentButtonStyle} />
                        <AraTesterAutoMovmentButton axisId={0} movment="backward" distance={this.state.distance} style={movmentButtonStyle} />
                        <AraTesterAutoMovmentButton axisId={0} movment="rotate right" distance={this.state.distance} style={movmentButtonStyle} />
                    </SimpleListItem>
                </List>
            </DeepContentBox>
        );
    }
}
