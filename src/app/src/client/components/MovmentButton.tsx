import * as React from 'react';
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

export type PositiveMovment = 'forward' | 'right' | 'up' | 'rotate right';

export type NegativeMovment = 'backward' | 'left' | 'down' | 'rotate left';

export type SyntheticEventHandler = React.EventHandler<React.SyntheticEvent>;

export interface MovmentButtonProps extends BasicButtonProps {
    movment: PositiveMovment | NegativeMovment;
    onButtonPress?: SyntheticEventHandler;
    onButtonRelease?: SyntheticEventHandler;
}

export default class SettingsButton extends React.Component<MovmentButtonProps, void> {
    public shouldComponentUpdate(props: MovmentButtonProps, state: void): boolean {
        const { movment, disabled } = this.props;
        return (movment !== props.movment) || (disabled !== props.disabled);
    }

    public render(): JSX.Element {
        const { style, disabled, onClick, onButtonPress, onButtonRelease } = this.props;
        let icon: JSX.Element;
        switch(this.props.movment) {
            case 'forward':
                icon = <Forward />;
                break;
            case 'backward':
                icon = <Backward />;
                break;
            case 'up':
                icon = <Up />;
                break;
            case 'down':
                icon = <Down />;
                break;
            case 'left':
                icon = <Left />;
                break;
            case 'right':
                icon = <Right />;
                break;
            case 'rotate left':
                icon = <RotateLeft />;
                break;
            case 'rotate right':
                icon = <RotateRight />;
                break;
        }
        const coloredIcon: JSX.Element = React.cloneElement(icon, { color: fullWhite });
        return (
            <RaisedButton
                style={style}
                disabled={disabled}
                icon={coloredIcon}
                primary
                onClick={onClick}
                onMouseDown={onButtonPress}
                onMouseUp={onButtonRelease}
                onTouchStart={onButtonPress}
                onTouchEnd={onButtonRelease} />
        );
    }
};