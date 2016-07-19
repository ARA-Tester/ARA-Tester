import * as React from 'react';
import AraTesterAxisService from './../../../services/AraTesterAxisService';
import { default as MovmentButton, SyntheticEventHandler } from './../../MovmentButton';

export default class AraTesterModules extends React.Component<void, void> {
    private _AraTesterAxisService: AraTesterAxisService;
    public onButtonPress: SyntheticEventHandler;
    public onButtonRelease: SyntheticEventHandler;

    public constructor() {
        super();
        this.onButtonPress = this.handleButtonPress.bind(this);
        this.onButtonRelease = this.handleButtonRelease.bind(this);
        this._AraTesterAxisService = new AraTesterAxisService(0);
    }

    public handleButtonPress(event: React.SyntheticEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this._AraTesterAxisService.moveAuto({ direction: false });
    }

    public handleButtonRelease(event: React.SyntheticEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this._AraTesterAxisService.stopAuto();
    }

    public render(): JSX.Element {
        return (
            <MovmentButton
                movment="rotate left"
                onButtonPress={this.onButtonPress}
                onButtonRelease={this.onButtonRelease} />
        );
    }
}