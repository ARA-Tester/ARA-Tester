import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import {fullWhite} from 'material-ui/styles/colors';
const { Component } = React;

interface ConfigButtonProps {
    onTouchTap: (event: any) => void;
}

export default class ConfigButton extends Component<ConfigButtonProps, {}> {
    render() {
        return <RaisedButton
            label="Config"
            labelPosition="before"
            primary={true}
            icon={<ActionSettings color={fullWhite} />}
            onTouchTap={this.props.onTouchTap} />;
    }
};