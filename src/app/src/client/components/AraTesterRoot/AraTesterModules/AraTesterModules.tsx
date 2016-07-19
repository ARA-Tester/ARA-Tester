import * as React from 'react';
import MovmentButton from './../../MovmentButton';

export default class AraTesterModules extends React.Component<void, void> {
    public onTouchStart: React.TouchEventHandler;
    public onTouchEnd: React.TouchEventHandler;

    public constructor() {
        super();
        this.onTouchStart = this.handleTouchStart.bind(this);
        this.onTouchEnd = this.handleTouchEnd.bind(this);
    }

    public handleTouchStart(event: React.TouchEvent): void {
        console.log('start');
        console.log(new Date());
    }

    public handleTouchEnd(event: React.TouchEvent): void {
        console.log('end');
        console.log(new Date());
    }

    public render(): JSX.Element {
        return <MovmentButton movment="rotate left" onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd} />
    }
}