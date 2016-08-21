import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import { fullWhite } from 'material-ui/styles/colors';
import BasicButtonProps from './BasicButtonProps';

export default class SettingsButton extends React.Component<BasicButtonProps, void> {
    public shouldComponentUpdate(props: BasicButtonProps, state: void): boolean {
        return this.props.disabled !== props.disabled;
    }

    public render(): JSX.Element {
        const { style, onClick, disabled } = this.props;
        return <RaisedButton
            style={style}
            disabled={disabled}
            label="settings"
            primary={true}
            icon={<ActionSettings color={fullWhite} />}
            onClick={onClick} />;
    }
};