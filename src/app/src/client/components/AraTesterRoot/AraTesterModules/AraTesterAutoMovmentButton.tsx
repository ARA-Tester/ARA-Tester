import * as React from 'react';
import AraTesterAxisService from './../../../services/AraTesterAxisService';
import AraTesterAxisId from './../../../../share/AraTesterAxisId';
import AraTesterAxisDistance from './../../../../share/AraTesterAxisDistance';
import { default as MovmentButton, SyntheticEventHandler, MovmentButtonProps } from './../../MovmentButton';

export interface AraTesterAutoMovmentButtonProps extends MovmentButtonProps, AraTesterAxisId, AraTesterAxisDistance {

}

export default class AraTesterAutoMovmentButton extends React.Component<AraTesterAutoMovmentButtonProps, void> {
    private _AraTesterAxisService: AraTesterAxisService;
    public onButtonPress: SyntheticEventHandler;
    public onButtonRelease: SyntheticEventHandler;

    public constructor(props: AraTesterAutoMovmentButtonProps) {
        super(props);
        this.onButtonPress = this.handleButtonPress.bind(this);
        this.onButtonRelease = this.handleButtonRelease.bind(this);
        this._AraTesterAxisService = new AraTesterAxisService(this.props.axisId);
    }

    public handleButtonPress(event: React.SyntheticEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this._AraTesterAxisService.moveAuto({
            direction: !this.props.movment.match(/(forward)|(right)|(up)|(rotate right)/),
            distance: this.props.distance
        });
    }

    public handleButtonRelease(event: React.SyntheticEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this._AraTesterAxisService.stopAuto();
    }

    public render(): JSX.Element {
        return (
            <MovmentButton
                style={this.props.style}
                movment={this.props.movment}
                onButtonPress={this.onButtonPress}
                onButtonRelease={this.onButtonRelease} />
        );
    }
}