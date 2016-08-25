import * as React from 'react';
import SlotSize from './SlotSize';
import Paper from 'material-ui/Paper';
import { Slot, SlotSelectionHandler } from './Slot';
import { Frame, FramePart } from './Frame';
import { AraSlots, AraSlotService } from './AraSlotService';
import { AraSlotIdentifier, AraSlot } from './AraSlot';

const { span, div } = React.DOM;

const totalMargin: number = Slot.margin * 4;

const width: number = Slot.verticalType.minWidth + Slot.horizontalType.minWidth + totalMargin;

const height: number = (Slot.mergedType.height * 2) + totalMargin + Frame.upHeight + Frame.downHeight;

const positionRight: React.CSSProperties = { float:Slot.mergedType.float };

const PhoneStyle: React.CSSProperties = { width: width, height: height, margin: 30 };

export { SlotSelectionHandler };

export interface SlotsProps {
    slots: AraSlots;
    onSlotSelection?: SlotSelectionHandler;
}

export class Slots extends React.PureComponent<SlotsProps, void> {
    private _onSlotSelection: SlotSelectionHandler;

    private _handleSelection(slot: AraSlotIdentifier): void {
        const { onSlotSelection } = this.props;
        if(onSlotSelection !== undefined) {
            onSlotSelection(slot);
        }
    }

    private _renderFrame(part: FramePart): JSX.Element {
        return (
            <div>
                <Frame part={part} />
            </div>
        );
    }

    private _renderSlot(araSlot: AraSlot, identifier: AraSlotIdentifier): JSX.Element {
        return <Slot {...araSlot} onSlotSelection={this._onSlotSelection} />;
    }

    private _renderNoneMergedSlot(identifier: AraSlotIdentifier): JSX.Element {
        const araSlot: AraSlot = AraSlotService.getSlotBaseForIdentifier(this.props.slots, identifier);
        return this._renderSlot(araSlot, identifier);
    }

    private _renderNoneVerticalSlots(merged: number, upHorizontal: number): JSX.Element {
        const { slots } = this.props;
        const mergedIdentifier: AraSlotIdentifier = `merged${merged}` as AraSlotIdentifier;
        const mergedSlot: AraSlot = AraSlotService.findSlotByIdentifier(slots, mergedIdentifier);
        if(AraSlotService.isSlot(mergedSlot)) {
            return this._renderSlot(mergedSlot, mergedIdentifier);
        } else {
            return (
                <span style={positionRight}>
                    <div>
                        {this._renderNoneMergedSlot(`horizontal${upHorizontal}` as AraSlotIdentifier)}
                    </div>
                    <div>
                        {this._renderNoneMergedSlot(`horizontal${upHorizontal + 1}` as AraSlotIdentifier)}
                    </div>
                </span>
            )
        }
    }

    private _renderSlotGroup(vertical: number, horizontal: number): JSX.Element {
        return (
            <div>
                <span>
                    {this._renderNoneMergedSlot(`vertical${vertical}` as AraSlotIdentifier)}
                    {this._renderNoneVerticalSlots(vertical, horizontal)}
                </span>
            </div>
        )
    }

    public constructor(props: SlotsProps) {
        super(props);
        this._onSlotSelection = this._handleSelection.bind(this);
    }

    public render(): JSX.Element {
        return (
            <Paper zDepth={5} style={PhoneStyle}>
                <div>
                    {this._renderFrame('up')}
                    {this._renderSlotGroup(1, 1)}
                    {this._renderSlotGroup(2, 3)}
                    {this._renderFrame('down')}
                </div>
            </Paper>
        );
    }
}

export default Slots;