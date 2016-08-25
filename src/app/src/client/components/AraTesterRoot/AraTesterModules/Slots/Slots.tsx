import * as React from 'react';
import Slot from './Slot';
import SlotSize from './SlotSize';
import Frame from './Frame';
import Paper from 'material-ui/Paper';

const { span, div } = React.DOM;

const totalMargin: number = Slot.margin * 4;

const width: number = Slot.verticalType.minWidth + Slot.horizontalType.minWidth + totalMargin;

const height: number = (Slot.mergedType.height * 2) + totalMargin + Frame.upHeight + Frame.downHeight;

console.log(width, height);

const positionRight: React.CSSProperties = { float:Slot.mergedType.float };

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
                            <Slot type="vertical" status="empty" />
                            <span style={positionRight}>
                                <div><Slot type="horizontal" status="module" slot={1} /></div>
                                <div><Slot type="horizontal" status="selected" /></div>
                            </span>
                        </span>
                    </div>
                    <div>
                        <span>
                            <Slot type="vertical" status="empty" />
                            <Slot type="merged" status="module" slot={2} />
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