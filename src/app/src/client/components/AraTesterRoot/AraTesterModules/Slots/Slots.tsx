import * as React from 'react';
import { SingleSlot, Margin } from './SingleSlot';
import DoubleSlot from './DoubleSlot';
import SlotSize from './SlotSize';
import Frame from './Frame';
import Paper from 'material-ui/Paper';

const { span, div } = React.DOM;

const width: number = (3 * SlotSize) + (4 * Margin);

const height: number = (6.25 * SlotSize) + (8 * Margin);

const PhoneStyle: React.CSSProperties = { width: width, height: height, margin: 'auto' };

export class Slots extends React.PureComponent<void, void> {
    public render(): JSX.Element {
        return (
            <Paper zDepth={5} style={PhoneStyle}>
                <div>
                    <div>
                        <Frame part="up" />
                    </div>
                    <div>
                        <span>
                            <SingleSlot />
                            <DoubleSlot />
                        </span>
                    </div>
                    <div>
                        <span>
                            <SingleSlot />
                            <DoubleSlot />
                        </span>
                    </div>
                    <div>
                        <Frame part="down" />
                    </div>
                </div>
            </Paper>
        );
    }
}

export default Slots;