import * as React from 'react';
import { TouchTapEventHandler } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import {fullWhite} from 'material-ui/styles/colors';
import DisabledProp from './DisabledProp';
import OptionalStyleProp from './OptionalStyleProp';

export interface ConfigButtonProps extends DisabledProp, OptionalStyleProp {
    onTouchTap: TouchTapEventHandler;
}

export default class ConfigButton extends React.Component<ConfigButtonProps, {}> {
    public render(): JSX.Element {
        return <RaisedButton
            style={this.props.style}
            disabled={this.props.disabled}
            label="Config"
            labelPosition="before"
            primary={true}
            icon={<ActionSettings color={fullWhite} />}
            onTouchTap={this.props.onTouchTap} />;
    }
};