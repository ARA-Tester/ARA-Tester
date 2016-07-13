import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import ContentUndo from 'material-ui/svg-icons/content/undo';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { red500, green500 } from 'material-ui/styles/colors';
import AraTesterConfigState from '../share/AraTesterAxisConfig';
import ConfigButton from './ConfigButton';
import EventValue from './EventValue';
const { DOM, Component } = React;
const { br, div } = DOM;

export interface AraTesterConfigProps {
    id: number;
}

const stylePaper = {
  padding: 10,
  textAlign: 'center',
  display: 'inline-block',
};

const actionButtonStyle = {
    marginTop: 5,
    marginBottom: 0
};

const actionRevertButtonStyle = Object.assign({}, actionButtonStyle, { marginRight: 15 });

const actionSaveButtonStyle = Object.assign({}, actionButtonStyle, { marginLeft: 15 });

export default class AraTesterConfig extends Component<AraTesterConfigProps, AraTesterConfigState> {
    public onPulseWidthChange: (event: any) => void;
    public onTMaxChange: (event: any) => void;
    public onTMinChange: (event: any) => void;
    public onTDeltaChange: (event: any) => void;
    public onConfiguredChange: (event: any) => void;
    public onConfigTouchTap: () => void;
    public onRevertTouchTap: () => void;
    public onSaveTouchTap: () => void;

    private _cloneState(): AraTesterConfigState {
        return {
            pulseWidth: this.state.pulseWidth,
            tMax: this.state.tMax,
            tMin: this.state.tMin,
            tDelta: this.state.tDelta,
            configured: this.state.configured
        };
    }

    private _getEventNumberValue(event: any): number {
        let eventValue: EventValue<number> = event.target.value as EventValue<number>;
        return eventValue.target.value;
    }

    private _setState(setter: (state: AraTesterConfigState) => void) {
        let clone: AraTesterConfigState = this._cloneState();
        setter(clone);
        this.setState(clone);
    }

    public constructor(props: AraTesterConfigProps) {
        super(props);
        this.state = {
            pulseWidth: 0,
            tMax: 0,
            tMin: 0,
            tDelta: 0,
            configured: 0
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

    public componentDidMount() {
        this.setState({
            pulseWidth: 50,
            tMax: 500000,
            tMin: 5000,
            tDelta: 100,
            configured: 6400
        });
    }

    public handlePulseWidthChange(event: any) {
        this._setState((state: AraTesterConfigState) => {
            state.pulseWidth = this._getEventNumberValue(event);
        });
    }

    public handleTMaxChange(event: any) {
        this._setState((state: AraTesterConfigState) => {
            state.tMax = this._getEventNumberValue(event);
        });
    }

    public handleTMinChange(event: any) {
        this._setState((state: AraTesterConfigState) => {
            state.tMin = this._getEventNumberValue(event);
        });
    }

    public handleTDeltaChange(event: any) {
        this._setState((state: AraTesterConfigState) => {
            state.tDelta = this._getEventNumberValue(event);
        });
    }

    public handleConfiguredChange(event: any) {
        this._setState((state: AraTesterConfigState) => {
            state.configured = this._getEventNumberValue(event);
        });
    }

    public handleConfigTouchTap() {
        console.log(this.state);
    }

    public handleRevertTouchTap() {
        console.log('revert');
    }

    public handleSaveTouchTap() {
        console.log('save');
    }

    public render() {
        return (
            <Paper style={stylePaper} zDepth={5}>
                <TextField type="number" floatingLabelText="Pulse Width" value={this.state.pulseWidth} onChange={this.onPulseWidthChange} />
                <br />
                <TextField type="number" floatingLabelText="T max" value={this.state.tMax} onChange={this.onTMaxChange} />
                <br />
                <TextField type="number" floatingLabelText="T min" value={this.state.tMin} onChange={this.onTMinChange} />
                <br />
                <TextField type="number" floatingLabelText="T delta" value={this.state.tDelta} onChange={this.onTDeltaChange} />
                <br />
                <TextField type="number" floatingLabelText="Configured" value={this.state.configured} onChange={this.onConfiguredChange} />
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
            </Paper>
        );
    }
};