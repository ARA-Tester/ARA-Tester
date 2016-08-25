import * as React from 'react';
import Slot from './Slot';
import SlotSize from './SlotSize';
import Frame from './Frame';
import Paper from 'material-ui/Paper';

const { span, div } = React.DOM;

const totalMargin: number = Slot.margin * 4;

const width: number = Slot.verticalPosition.minWidth + Slot.horizontalPosition.minWidth + totalMargin;

const height: number = (Slot.mergedPosition.height * 2) + totalMargin + Frame.upHeight + Frame.downHeight;

console.log(width, height);

const positionRight: React.CSSProperties = { float:Slot.mergedPosition.float };

const PhoneStyle: React.CSSProperties = { width: width, height: height, margin: 30 };

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
                            <Slot position="vertical" />
                            <span style={positionRight}>
                                <div><Slot position="horizontal" /></div>
                                <div><Slot position="horizontal" /></div>
                            </span>
                        </span>
                    </div>
                    <div>
                        <span>
                            <Slot position="vertical" />
                            <Slot position="merged" />
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