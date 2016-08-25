import * as React from 'react';
import SlotSize from './SlotSize';
import Paper from 'material-ui/Paper';
import { Slot, SelectionHandler } from './Slot';
import { Frame, FramePart } from './Frame';
import { AraSlots, AraSlotService } from './AraSlotService';
import { AraSlotIdentifier, AraSlot, SlotBase } from './AraSlot';

const { span, div } = React.DOM;

const totalMargin: number = Slot.margin * 4;

const width: number = Slot.verticalType.minWidth + Slot.horizontalType.minWidth + totalMargin;

const height: number = (Slot.mergedType.height * 2) + totalMargin + Frame.upHeight + Frame.downHeight;

const positionRight: React.CSSProperties = { float:Slot.mergedType.float };

const PhoneStyle: React.CSSProperties = { width: width, height: height, margin: 30 };

export type SlotSelectionHandler = (slot: AraSlotIdentifier) => void;

export interface SlotsProps {
    slots: AraSlots;
    onSlotSelection?: SlotSelectionHandler;
}

export class Slots extends React.PureComponent<SlotsProps, void> {
    private _onVertical1Selection: SelectionHandler;
    private _onVertical2Selection: SelectionHandler;
    private _onHorizontal1Selection: SelectionHandler;
    private _onHorizontal2Selection: SelectionHandler;
    private _onHorizontal3Selection: SelectionHandler;
    private _onHorizontal4Selection: SelectionHandler;
    private _onMerged1Selection: SelectionHandler;
    private _onMerged2Selection: SelectionHandler;

    private _handleSelection(slot: AraSlotIdentifier): void {
        const { onSlotSelection } = this.props;
        if(onSlotSelection !== undefined) {
            onSlotSelection(slot);
        }
    }

    private _getSelectionHandlerForIdentifier(identifier: AraSlotIdentifier) {
        console.log(`handler for ${identifier}`);
        switch(identifier) {
            case 'vertical1': return this._onVertical1Selection;
            case 'vertical2': return this._onVertical2Selection;
            case 'horizontal1': return this._onHorizontal1Selection;
            case 'horizontal2': return this._onHorizontal2Selection;
            case 'horizontal3': return this._onHorizontal3Selection;
            case 'horizontal4': return this._onHorizontal4Selection;
            case 'merged1': return this._onMerged1Selection;
            case 'merged2': return this._onMerged2Selection;
        }
    }

    private _renderFrame(part: FramePart): JSX.Element {
        return (
            <div>
                <Frame part={part} />
            </div>
        );
    }

    private _renderSlot(slotBase: SlotBase, identifier: AraSlotIdentifier): JSX.Element {
        return <Slot {...slotBase} onSelection={this._getSelectionHandlerForIdentifier(identifier)} />;
    }

    private _renderNoneMergedSlot(identifier: AraSlotIdentifier): JSX.Element {
        const props: SlotBase = AraSlotService.getSlotBaseForIdentifier(this.props.slots, identifier);
        return this._renderSlot(props, identifier);
    }

    private _renderNoneVerticalSlots(merged: number, upHorizontal: number): JSX.Element {
        const { slots } = this.props;
        const mergedIdentifier: AraSlotIdentifier = `merged${merged}` as AraSlotIdentifier;
        const mergedSlot: AraSlot = AraSlotService.findSlotByIdentifier(slots, mergedIdentifier);
        if(AraSlotService.isSlot(mergedSlot)) {
            const props: SlotBase = AraSlotService.stricCastAraSlotToSlotBase(mergedSlot);
            return this._renderSlot(props, mergedIdentifier);
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
        this._onVertical1Selection = this._handleSelection.bind(this, 'vertical1');
        this._onVertical2Selection = this._handleSelection.bind(this, 'vertical2');
        this._onHorizontal1Selection = this._handleSelection.bind(this, 'horizontal1');
        this._onHorizontal2Selection = this._handleSelection.bind(this, 'horizontal2');
        this._onHorizontal3Selection = this._handleSelection.bind(this, 'horizontal3');
        this._onHorizontal4Selection = this._handleSelection.bind(this, 'horizontal4');
        this._onMerged1Selection = this._handleSelection.bind(this, 'merged1');
        this._onMerged2Selection = this._handleSelection.bind(this, 'merged2');
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