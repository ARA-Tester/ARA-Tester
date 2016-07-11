import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import {fullWhite} from 'material-ui/styles/colors';
const { DOM, Component } = React;
const { br } = DOM;

interface AraTesterConfigProps {
    pulseWidth: number;
    tMax: number;
    tMin: number;
    tDelta: number;
    configured: number;
}

const stylePaper = {
  padding: 10,
  textAlign: 'center',
  display: 'inline-block',
};

export default class AraTesterConfig extends Component<AraTesterConfigProps, {}> {
    render() {
        return (
            <Paper style={stylePaper} zDepth={5}>
                <TextField type="number" floatingLabelText="Pulse Width" defaultValue={this.props.pulseWidth} />
                <br />
                <TextField type="number" floatingLabelText="T max" defaultValue={this.props.tMax} />
                <br />
                <TextField type="number" floatingLabelText="T min" defaultValue={this.props.tMin} />
                <br />
                <TextField type="number" floatingLabelText="T delta" defaultValue={this.props.tDelta} />
                <br />
                <TextField type="number" floatingLabelText="Configured" defaultValue={this.props.configured} />
                <br />
                <RaisedButton label="Config" primary={true} icon={<ActionSettings color={fullWhite} />} />
            </Paper>
        );
    }
}