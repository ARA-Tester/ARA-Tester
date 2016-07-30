import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import { fullWhite } from 'material-ui/styles/colors';
import BasicButtonProps from './BasicButtonProps';

export default class SettingsButton extends React.Component<BasicButtonProps, void> {
    public render(): JSX.Element {
        return <RaisedButton
            style={this.props.style}
            disabled={this.props.disabled}
            label="settings"
            primary={true}
            icon={<ActionSettings color={fullWhite} />}
            onClick={this.props.onClick} />;
    }
};