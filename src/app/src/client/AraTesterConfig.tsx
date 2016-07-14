import * as React from 'react';
import { TouchTapEventHandler, TouchTapEvent } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import ContentUndo from 'material-ui/svg-icons/content/undo';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { red500, green500 } from 'material-ui/styles/colors';
import AraTesterConfigState from '../share/AraTesterAxisConfig';
import DeepContentBox from './DeepContentBox';
import { default as NumberInput, NumberInputValueHandler } from './NumberInput';
import ConfigButton from './ConfigButton';
const { DOM } = React;
const { br, div } = DOM;

export interface AraTesterConfigProps {
    id: number;
}

const actionButtonStyle = {
    marginTop: 5,
    marginBottom: 0
};

const actionRevertButtonStyle = Object.assign({}, actionButtonStyle, { marginRight: 15 });

const actionSaveButtonStyle = Object.assign({}, actionButtonStyle, { marginLeft: 15 });

export default class AraTesterConfig extends React.Component<AraTesterConfigProps, AraTesterConfigState> {
    public onPulseWidthChange: NumberInputValueHandler;
    public onTMaxChange: NumberInputValueHandler;
    public onTMinChange: NumberInputValueHandler;
    public onTDeltaChange: NumberInputValueHandler;
    public onConfiguredChange: NumberInputValueHandler;
    public onConfigTouchTap: TouchTapEventHandler;
    public onRevertTouchTap: TouchTapEventHandler;
    public onSaveTouchTap: TouchTapEventHandler;

    private _setState(setter: (state: AraTesterConfigState) => void) {
        let clone: AraTesterConfigState = Object.assign({}, this.state);
        setter(clone);
        this.setState(clone);
    }

    public constructor(props: AraTesterConfigProps) {
        super(props);
        this.state = {
            pulseWidth: 50,
            tMax: 500000,
            tMin: 5000,
            tDelta: 100,
            configured: 6400
        };
        this.onPulseWidthChange = this.handlePulseWidthChange.bind(this);
        this.onTMaxChange = this.handleTMaxChange.bind(this);
        this.onTMinChange = this.handleTMinChange.bind(this);
        this.onTDeltaChange = this.handleTDeltaChange.bind(this);
        this.onConfiguredChange = this.handleConfiguredChange.bind(this);
        this.onConfigTouchTap = this.handleConfigTouchTap.bind(this);
        this.onRevertTouchTap = this.handleRevertTouchTap.bind(this);
        this.onSaveTouchTap = this.handleSaveTouchTap.bind(this);
    }

    public handlePulseWidthChange(value: number) {
        this._setState((state: AraTesterConfigState) => { state.pulseWidth = value; });
    }

    public handleTMaxChange(value: number) {
        this._setState((state: AraTesterConfigState) => { state.tMax = value; });
    }

    public handleTMinChange(value: number) {
        this._setState((state: AraTesterConfigState) => { state.tMin = value; });
    }

    public handleTDeltaChange(value: number) {
        this._setState((state: AraTesterConfigState) => { state.tDelta = value; });
    }

    public handleConfiguredChange(value: number) {
        this._setState((state: AraTesterConfigState) => { state.configured = value; });
    }

    public handleConfigTouchTap(event: TouchTapEvent) {
        console.log(this.state);
    }

    public handleRevertTouchTap(event: TouchTapEvent) {
        console.log('revert');
    }

    public handleSaveTouchTap(event: TouchTapEvent) {
        console.log('save');
    }

    public render(): JSX.Element {
        return (
            <DeepContentBox>
                <NumberInput label="Pulse Width" value={this.state.pulseWidth} onChange={this.onPulseWidthChange} />
                <br />
                <NumberInput label="T max" value={this.state.tMax} onChange={this.onTMaxChange} />
                <br />
                <NumberInput label="T min" value={this.state.tMin} onChange={this.onTMinChange} />
                <br />
                <NumberInput label="T delta" value={this.state.tDelta} onChange={this.onTDeltaChange} />
                <br />
                <NumberInput label="Configured" value={this.state.configured} onChange={this.onConfiguredChange} />
                <br />
                <ConfigButton onTouchTap={this.onConfigTouchTap} />
                <br />
                <div style={actionButtonStyle} >
                    <RaisedButton
                        label="Revert"
                        icon={<ContentUndo color={red500} />}
                        style={actionRevertButtonStyle}
                        onTouchTap={this.onRevertTouchTap} />
                    <RaisedButton
                        label="Save"
                        labelPosition="before"
                        icon={<ContentAdd color={green500} />}
                        style={actionSaveButtonStyle}
                        onTouchTap={this.onSaveTouchTap} />
                </div>
            </DeepContentBox>
        );
    }
};