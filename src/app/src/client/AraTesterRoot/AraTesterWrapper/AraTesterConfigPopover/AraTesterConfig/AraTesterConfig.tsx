import * as React from 'react';
import { TouchTapEventHandler, TouchTapEvent } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import ContentUndo from 'material-ui/svg-icons/content/undo';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { red500, green500 } from 'material-ui/styles/colors';
import AraTesterWrapperChildProps from './../../AraTesterWrapperChildProps';
import AraTesterConfigState from './../../../../../share/AraTesterAxisConfig';
import DeepContentBox from './../../../../DeepContentBox';
import { default as NumberInput, NumberInputValueHandler } from './../../../../NumberInput';
import ConfigButton from './../../../../ConfigButton';
const { br, div } = React.DOM;

const actionButtonStyle: React.CSSProperties = {
    marginTop: 5,
    marginBottom: 0
};

const actionRevertButtonStyle = Object.assign({}, actionButtonStyle, { marginRight: 15 });

const actionSaveButtonStyle = Object.assign({}, actionButtonStyle, { marginLeft: 15 });

export default class AraTesterConfig extends React.Component<AraTesterWrapperChildProps, AraTesterConfigState> {
    private static _copyConfigInfo(info: AraTesterConfigState): AraTesterConfigState {
        return Object.assign({}, info);
    }

    private _revertInfo: AraTesterConfigState;
    public onPulseWidthChange: NumberInputValueHandler;
    public onTMaxChange: NumberInputValueHandler;
    public onTMinChange: NumberInputValueHandler;
    public onTDeltaChange: NumberInputValueHandler;
    public onConfiguredChange: NumberInputValueHandler;
    public onConfigTouchTap: TouchTapEventHandler;
    public onRevertTouchTap: TouchTapEventHandler;
    public onSaveTouchTap: TouchTapEventHandler;

    private _copyState(): AraTesterConfigState {
        return AraTesterConfig._copyConfigInfo(this.state);
    }

    private _setState(setter: (state: AraTesterConfigState) => void) {
        let clone: AraTesterConfigState = this._copyState();
        setter(clone);
        this.setState(clone);
    }

    public constructor(props: AraTesterWrapperChildProps) {
        let initalState: AraTesterConfigState = {
            pulseWidth: 0,
            tMax: 0,
            tMin: 0,
            tDelta: 0,
            configured: 0
        };
        super(props);
        this.state = AraTesterConfig._copyConfigInfo(initalState);
        this._revertInfo = AraTesterConfig._copyConfigInfo(initalState);
        this.onPulseWidthChange = this.handlePulseWidthChange.bind(this);
        this.onTMaxChange = this.handleTMaxChange.bind(this);
        this.onTMinChange = this.handleTMinChange.bind(this);
        this.onTDeltaChange = this.handleTDeltaChange.bind(this);
        this.onConfiguredChange = this.handleConfiguredChange.bind(this);
        this.onConfigTouchTap = this.handleConfigTouchTap.bind(this);
        this.onRevertTouchTap = this.handleRevertTouchTap.bind(this);
        this.onSaveTouchTap = this.handleSaveTouchTap.bind(this);
    }

    public componentDidMount() {
        let state: AraTesterConfigState = {
            pulseWidth: 50,
            tMax: 500000,
            tMin: 5000,
            tDelta: 100,
            configured: 6400
        };
        this.setState(state);
        this._revertInfo = AraTesterConfig._copyConfigInfo(state);
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
        this.setState(this._revertInfo);
    }

    public handleSaveTouchTap(event: TouchTapEvent) {
        this._revertInfo = this._copyState();
    }

    public render(): JSX.Element {
        return (
            <DeepContentBox style={this.props.style}>
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
                <ConfigButton disabled={this.props.disabled} onTouchTap={this.onConfigTouchTap} />
                <br />
                <div style={actionButtonStyle}>
                    <RaisedButton
                        style={actionRevertButtonStyle}
                        disabled={this.props.disabled}
                        label="Revert"
                        icon={<ContentUndo color={red500} />}
                        onTouchTap={this.onRevertTouchTap} />
                    <RaisedButton
                        style={actionRevertButtonStyle}
                        disabled={this.props.disabled}
                        label="Save"
                        labelPosition="before"
                        icon={<ContentAdd color={green500} />}
                        onTouchTap={this.onSaveTouchTap} />
                </div>
            </DeepContentBox>
        );
    }
};