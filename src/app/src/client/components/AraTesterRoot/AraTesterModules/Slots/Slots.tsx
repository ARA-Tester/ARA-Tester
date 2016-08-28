import * as React from 'react';
import SlotSize from './SlotSize';
import Paper from 'material-ui/Paper';
import { Slot, SlotSelectionHandler } from './Slot';
import { Frame, FrameProps, FramePart, FrameOrnamentColor } from './Frame';
import { AraSlots, AraSlotService } from './AraSlotService';
import { AraSlotIdentifier, AraSlot } from './AraSlot';

const { span, div } = React.DOM;

export const TotalMargin: number = Slot.margin * 4;

export const Width: number = Slot.verticalType.minWidth + Slot.horizontalType.minWidth + TotalMargin;

export const Height: number = (Slot.mergedType.height * 2) + TotalMargin + Frame.upHeight + Frame.downHeight;

const PositionRight: React.CSSProperties = { float:Slot.mergedType.float };

const FrameOutline: React.CSSProperties = { backgroundColor: FrameOrnamentColor };

export const AraSizeStyle: React.CSSProperties = { width: Width, height: Height };

export { SlotSelectionHandler };

export interface SlotsProps {
    slots: AraSlots;
    onSlotSelection?: SlotSelectionHandler;
}

function SlotsFrame(props: FrameProps): JSX.Element {
    return (
        <div>
            <Frame {...props} />
        </div>
    );
}

interface NoneMergedSlotProps extends SlotsProps {
    identifier: AraSlotIdentifier;
}

function NoneMergedSlot(props: NoneMergedSlotProps): JSX.Element {
    const { slots, identifier, onSlotSelection } = props;
    const araSlot: AraSlot = AraSlotService.getSlotBaseForIdentifier(slots, identifier);
    return <Slot {...araSlot} onSlotSelection={onSlotSelection} />;
}

interface NoneVerticalSlotProps extends SlotsProps {
    merged: number;
    upperHorizontal: number;
}

function NoneVertcalSlots(props: NoneVerticalSlotProps): JSX.Element {
    const { slots, merged, upperHorizontal, onSlotSelection } = props;
    const mergedIdentifier: AraSlotIdentifier = `merged${merged}` as AraSlotIdentifier;
    const mergedSlot: AraSlot = AraSlotService.findSlotByIdentifier(slots, mergedIdentifier);
    if(AraSlotService.isSlot(mergedSlot)) {
        return <Slot {...mergedSlot} onSlotSelection={onSlotSelection} />;
    } else {
        return (
            <span style={PositionRight}>
                <div>
                    <NoneMergedSlot
                        slots={slots}
                        onSlotSelection={onSlotSelection}
                        identifier={`horizontal${upperHorizontal}` as AraSlotIdentifier}
                    />
                </div>
                <div>
                    <NoneMergedSlot
                        slots={slots}
                        onSlotSelection={onSlotSelection}
                        identifier={`horizontal${upperHorizontal + 1}` as AraSlotIdentifier}
                    />
                </div>
            </span>
        );
    }
}

interface SlotsGroupProps extends SlotsProps {
    vertical: number;
    horizontal: number;
}

function SlotsGroup(props: SlotsGroupProps): JSX.Element {
    const { slots, onSlotSelection, vertical, horizontal } = props;
    return (
        <div>
            <span>
                <NoneMergedSlot
                    slots={slots}
                    onSlotSelection={onSlotSelection}
                    identifier={`vertical${vertical}` as AraSlotIdentifier}
                />
                <NoneVertcalSlots
                    slots={slots}
                    onSlotSelection={onSlotSelection}
                    merged={vertical}
                    upperHorizontal={horizontal}
                />
            </span>
        </div>
    );
}

export function Slots(props: SlotsProps): JSX.Element {
    return (
        <Paper zDepth={5} style={AraSizeStyle}>
            <div style={FrameOutline}>
                <SlotsFrame part="up" />
                <SlotsGroup {...props} vertical={1} horizontal={1} />
                <SlotsGroup {...props} vertical={2} horizontal={3} />
                <SlotsFrame part="down" />
            </div>
        </Paper>
    );
}

export default Slots;