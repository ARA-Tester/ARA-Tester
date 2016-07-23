import * as React from 'react';
import AraTesterAxisService from './../../../services/AraTesterAxisService';
import AraTesterAxisId from './../../../../share/AraTesterAxisId';
import AraTesterAxisDistance from './../../../../share/AraTesterAxisDistance';
import AraTesterAxisMovment from './../../../../share/AraTesterAxisMovment';
import { default as MovmentButton, SyntheticEventHandler, MovmentButtonProps } from './../../MovmentButton';

export interface AraTesterAutoMovmentButtonProps extends MovmentButtonProps, AraTesterAxisId, AraTesterAxisDistance {

}

export interface AraTesterAutoMovmentButtonState {
    keepMoving: boolean
}

export default class AraTesterAutoMovmentButton extends React.Component<AraTesterAutoMovmentButtonProps, AraTesterAutoMovmentButtonState> {
    private _AraTesterAxisService: AraTesterAxisService;
    private _timeout: number;
    public onButtonPress: SyntheticEventHandler;
    public onButtonRelease: SyntheticEventHandler;

    private _move(): Promise<void> {
        return this._AraTesterAxisService.movment({
            direction: !this.props.movment.match(/(forward)|(right)|(up)|(rotate right)/),
            distance: this.props.distance
        });
    }

    public constructor(props: AraTesterAutoMovmentButtonProps) {
        super(props);
        this.state = { keepMoving: false };
        this.onButtonPress = this.handleButtonPress.bind(this);
        this.onButtonRelease = this.handleButtonRelease.bind(this);
        this._AraTesterAxisService = new AraTesterAxisService(this.props.axisId);
    }

    public componentDidMount(): void {
        this._AraTesterAxisService.onMovmentEnd(() => {
            if(this.state.keepMoving) {
                this._move();
            }
        });
    }

    public componentWillUnmount(): void {
        this._AraTesterAxisService.removeMovmentEnd();
    }

    public handleButtonPress(event: React.SyntheticEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this._timeout = window.setTimeout(() => {
            this.setState({ keepMoving: true });
            this._move();
        }, 300);
        this._move();
    }

    public handleButtonRelease(event: React.SyntheticEvent): void {
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(this._timeout);
        this.setState({ keepMoving: false });
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