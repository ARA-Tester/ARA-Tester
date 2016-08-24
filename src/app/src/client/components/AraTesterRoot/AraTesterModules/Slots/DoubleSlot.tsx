import * as React from 'react';
import SingleSlot from './SingleSlot';;

const { span, div } = React.DOM;

export class DoubleSlot extends React.Component<void, void> {
    public render(): JSX.Element {
        return (
            <span style={{ float: 'right' }}>
                <div><SingleSlot position="horizontal" /></div>
                <div><SingleSlot position="horizontal" /></div>
            </span>
        );
    }
}

export default DoubleSlot;