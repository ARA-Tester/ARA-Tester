import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import AraTesterConfigState from '../share/AraTesterAxisConfig';
import {fullWhite} from 'material-ui/styles/colors';
const { DOM, Component } = React;
const { br } = DOM;

interface AraTesterConfigProps {
    id: number;
}

const stylePaper = {
  padding: 10,
  textAlign: 'center',
  display: 'inline-block',
};

export default class AraTesterConfig extends Component<AraTesterConfigProps, AraTesterConfigState> {

    public onPulseWidthChange: (event: any) => void;
    public onTMaxChange: (event: any) => void;
    public onTMinChange: (event: any) => void;
    public onTDeltaChange: (event: any) => void;
    public onConfiguredChange: (event: any) => void;
    public onConfigClick: () => void;

    private _cloneState(): AraTesterConfigState {
        return {
            pulseWidth: this.state.pulseWidth,
            tMax: this.state.tMax,
            tMin: this.state.tMin,
            tDelta: this.state.tDelta,
            configured: this.state.configured
        };
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
        this.onPulseWidthChange = this.pulseWidthChange.bind(this);
        this.onTMaxChange = this.tMaxChange.bind(this);
        this.onTMinChange = this.tMinChange.bind(this);
        this.onTDeltaChange = this.tDeltaChange.bind(this);
        this.onConfiguredChange = this.configuredChange.bind(this);
        this.onConfigClick = this.configClick.bind(this);
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

    public pulseWidthChange(event: any) {
        this._setState((state: AraTesterConfigState) => {
            state.pulseWidth = event.target.value;
        });
    }

    public tMaxChange(event: any) {
        this._setState((state: AraTesterConfigState) => {
            state.tMax = event.target.value;
        });
    }

    public tMinChange(event: any) {
        this._setState((state: AraTesterConfigState) => {
            state.tMin = event.target.value;
        });
    }

    public tDeltaChange(event: any) {
        this._setState((state: AraTesterConfigState) => {
            state.tDelta = event.target.value;
        });
    }

    public configuredChange(event: any) {
        this._setState((state: AraTesterConfigState) => {
            state.configured = event.target.value;
        });
    }

    public configClick() {
        console.log(this.state);
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
                <RaisedButton label="Config" primary={true} icon={<ActionSettings color={fullWhite} />} onClick={this.onConfigClick} />
            </Paper>
        );
    }
}