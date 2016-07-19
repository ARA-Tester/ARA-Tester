import * as React from 'react';
import MovmentButton from './../../MovmentButton';

export default class AraTesterModules extends React.Component<void, void> {
    public onTouchStart: React.TouchEventHandler;
    public onTouchEnd: React.TouchEventHandler;
    public onMouseDown: React.MouseEventHandler;
    public onMouseUp: React.MouseEventHandler;

    public constructor() {
        super();
        this.onTouchStart = this.handleTouchStart.bind(this);
        this.onTouchEnd = this.handleTouchEnd.bind(this);
        this.onMouseDown = this.handleMouseDown.bind(this);
        this.onMouseUp = this.handleMouseUp.bind(this);
    }

    public handleTouchStart(event: React.TouchEvent): void {
        event.preventDefault();
        event.stopPropagation();
        console.log(event);
        console.log('start');
        console.log(new Date());
    }

    public handleTouchEnd(event: React.TouchEvent): void {
        event.preventDefault();
        event.stopPropagation();
        console.log(event);
        console.log('end');
        console.log(new Date());
    }

    public handleMouseDown(event: React.MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        console.log(event);
        console.log('down');
        console.log(new Date());
    }

    public handleMouseUp(event: React.MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        console.log(event);
        console.log('up');
        console.log(new Date());
    }

    public render(): JSX.Element {
        return (
            <MovmentButton
                movment="rotate left"
                onMouseDown={this.onMouseDown} 
                onMouseUp={this.onMouseUp} />
        );
    }
}