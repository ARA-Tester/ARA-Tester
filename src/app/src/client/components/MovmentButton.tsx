import * as React from 'react';
import { TouchTapEventHandler } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { fullWhite } from 'material-ui/styles/colors';
import Backward from 'material-ui/svg-icons/navigation/arrow-downward';
import Forward from 'material-ui/svg-icons/navigation/arrow-upward';
import Left from 'material-ui/svg-icons/navigation/arrow-back';
import Right from 'material-ui/svg-icons/navigation/arrow-forward';
import Up from 'material-ui/svg-icons/communication/call-made';
import Down from 'material-ui/svg-icons/communication/call-received';
import RotateLeft from 'material-ui/svg-icons/av/replay';
import RotateRight from 'material-ui/svg-icons/navigation/refresh';
import BasicButtonProps from './BasicButtonProps';

interface MovmentButtonProps extends BasicButtonProps {
    movment: 'forward' | 'backward' | 'up' | 'down' | 'left' | 'right' | 'rotate left' | 'rotate right';
}

export default class SettingsButton extends React.Component<MovmentButtonProps, void> {
    public render(): JSX.Element {
        let icon: JSX.Element;
        switch(this.props.movment) {
            case 'forward':
                icon = <Forward color={fullWhite} />;
                break;
            case 'backward':
                icon = <Backward color={fullWhite} />;
                break;
            case 'up':
                icon = <Up color={fullWhite} />;
                break;
            case 'down':
                icon = <Down color={fullWhite} />;
                break;
            case 'left':
                icon = <Left color={fullWhite} />;
                break;
            case 'right':
                icon = <Right color={fullWhite} />;
                break;
            case 'rotate left':
                icon = <RotateLeft color={fullWhite} />;
                break;
            case 'rotate right':
                icon = <RotateRight color={fullWhite} />;
                break;
        }
        return (
            <RaisedButton
                style={this.props.style}
                disabled={this.props.disabled}
                icon={icon}
                primary={true}
                onTouchTap={this.props.onTouchTap} />
        );
    }
};