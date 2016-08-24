import * as React from 'react';
import AraTesterAutoMovmentButton from './AraTesterAutoMovmentButton';
import DeepContentBox from './../../../DeepContentBox';
import StyleProp from './../../../StyleProp';
import AraTesterControllsState from './../../../../../share/AraTesterAxisDistance';
import MovmentIcon from 'material-ui/svg-icons/action/open-with';
import { ButtonSelect, SelectableButton, SelectHandler } from './../../../ButtonSelect/ButtonSelect';
import RaisedButton from 'material-ui/RaisedButton';
import List from 'material-ui/List';

const { div } = React.DOM;

const movmentButtonStyle: React.CSSProperties = { margin: 5 };

export default class AraTesterControlls extends React.Component<StyleProp, AraTesterControllsState> {
    public onDistanceSelect: SelectHandler;

    public constructor(props: StyleProp) {
        super(props);
        this.state = { distance: 0.05 };
        this.onDistanceSelect = this.handleDistanceSelect.bind(this);
    }

    public shouldComponentUpdate(props: StyleProp, state: AraTesterControllsState): boolean {
        return (this.state.distance !== state.distance);
    }

    public handleDistanceSelect(select: string): void {
        this.setState({ distance: Number(select) });
    }

    public render(): JSX.Element {
        const { distance } = this.state;
        return (
            <DeepContentBox style={this.props.style}>
               <List>
                    <div>
                        <ButtonSelect
                            selected={String(distance)}
                            onSelect={this.onDistanceSelect}
                            buttonStyle={movmentButtonStyle}
                            style={movmentButtonStyle} >
                                <SelectableButton value="5" label="long" />
                                <SelectableButton value="0.5" label="medium" />
                                <SelectableButton value="0.05" label="short" />
                        </ButtonSelect>
                    </div>
                    <div>
                        <AraTesterAutoMovmentButton axisId={0} movment="rotate left" distance={distance} style={movmentButtonStyle} />
                        <AraTesterAutoMovmentButton axisId={0} movment="forward" distance={distance} style={movmentButtonStyle} />
                        <AraTesterAutoMovmentButton axisId={0} movment="up" distance={distance} style={movmentButtonStyle} />
                    </div>
                    <div>
                        <AraTesterAutoMovmentButton axisId={0} movment="left" distance={distance} style={movmentButtonStyle} />
                        <RaisedButton disabled={true} icon={<MovmentIcon />} style={movmentButtonStyle} />
                        <AraTesterAutoMovmentButton axisId={0} movment="right" distance={distance} style={movmentButtonStyle} />
                    </div>
                    <div>
                        <AraTesterAutoMovmentButton axisId={0} movment="down" distance={distance} style={movmentButtonStyle} />
                        <AraTesterAutoMovmentButton axisId={0} movment="backward" distance={distance} style={movmentButtonStyle} />
                        <AraTesterAutoMovmentButton axisId={0} movment="rotate right" distance={distance} style={movmentButtonStyle} />
                    </div>
                </List>
            </DeepContentBox>
        );
    }
}
