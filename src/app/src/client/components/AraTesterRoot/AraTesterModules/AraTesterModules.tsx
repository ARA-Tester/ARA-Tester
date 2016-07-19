import * as React from 'react';
import { default as MovmentButton, SyntheticEventHandler } from './../../MovmentButton';

export default class AraTesterModules extends React.Component<void, void> {
    public onButtonPress: SyntheticEventHandler;
    public onButtonRelease: SyntheticEventHandler;

    public constructor() {
        super();
        this.onButtonPress = this.handleButtonPress.bind(this);
        this.onButtonRelease = this.handleButtonRelease.bind(this);
    }

    public handleButtonPress(event: React.SyntheticEvent): void {
        event.preventDefault();
        event.stopPropagation();
        console.log('pres');
        console.log(new Date());
    }

    public handleButtonRelease(event: React.SyntheticEvent): void {
        event.preventDefault();
        event.stopPropagation();
        console.log('release');
        console.log(new Date());
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