import * as React from 'react';
import SlotSize from './SlotSize';
import RaisedButton from 'material-ui/RaisedButton';
import { grey400, grey700, blueGrey400, amber500 } from 'material-ui/styles/colors';
import EmptySlot from 'material-ui/svg-icons/image/filter-none';
import SVGIcon from 'material-ui/SvgIcon';
import Slot1 from 'material-ui/svg-icons/image/filter-1';
import Slot2 from 'material-ui/svg-icons/image/filter-2';
import Slot3 from 'material-ui/svg-icons/image/filter-3';
import Slot4 from 'material-ui/svg-icons/image/filter-4';
import Slot5 from 'material-ui/svg-icons/image/filter-5';
import Slot6 from 'material-ui/svg-icons/image/filter-6';
import SelectedSlot from 'material-ui/svg-icons/image/filter-center-focus';
import { SlotBase, AraSlot, AraSlotIdentifier, SlotType } from './AraSlot';
import AraSlotService from './AraSlotService';

const Margin: number = 2;

const Size1: number = SlotSize;

const Size2: number = SlotSize * 2;

const IconSize: number = (SlotSize / 2) + (10 * Margin);

const versticalHeight: number = Size2 + (2 * Margin);

const VerticalType: React.CSSProperties = { minWidth: Size1, height: versticalHeight, float: 'left'};

const HorizontalType: React.CSSProperties = { minWidth: Size2, height: Size1 };

const MergedType: React.CSSProperties = { minWidth: Size2, height: versticalHeight, float: 'right' };

export type SlotSelectionHandler = (identifier: AraSlotIdentifier ) => void;

export interface SlotProps extends SlotBase {
    onSlotSelection: SlotSelectionHandler;
}

export class Slot extends React.Component<SlotProps, void> {
    private static _slotIcons: Array<React.ComponentClass<any>> = [
        EmptySlot,
        Slot1,
        Slot2,
        Slot3,
        Slot4,
        Slot5,
        Slot6,
        SelectedSlot
    ];
    public static margin: number = Margin;
    public static verticalType: React.CSSProperties = VerticalType;
    public static horizontalType: React.CSSProperties = HorizontalType;
    public static mergedType: React.CSSProperties = MergedType;
    private _onClick: React.MouseEventHandler;

    private static _getTypeSize(type: SlotType): React.CSSProperties {
        switch(type) {
            case 'vertical': return VerticalType;
            case 'horizontal': return HorizontalType;
            case 'merged': return MergedType;
        }
    }

    private static _getStyles(type: SlotType): React.CSSProperties {
        return Object.assign({ margin: Margin }, Slot._getTypeSize(type));
    }

    private _handleClick(event: React.MouseEvent): void {
        const { status, identifier, onSlotSelection } = this.props;
        event.stopPropagation();
        event.preventDefault();
        if(status === 'empty') {
            onSlotSelection(identifier);
        }
    }

    private _getStatusColor(): string {
        switch(this.props.status) {
            case 'empty': return grey400;
            case 'module': return grey700;
            case 'selected': return blueGrey400;
        }
    }

    private _getSlotIcon(): React.ComponentClass<any> {
        const { status, index } = this.props;
        const iconIndex: number = status === 'empty' ? 0 : (status === 'selected' ? 7 : index); 
        return Slot._slotIcons[iconIndex];
    }

    private _getIcon(): React.ReactNode {
        return React.createElement(this._getSlotIcon(), { style: { width: IconSize, height: IconSize }, color: amber500 });
    }

    public constructor(props: SlotProps) {
        super(props);
        this._onClick = this._handleClick.bind(this);
    }

    public shouldComponentUpdate(props: SlotProps): boolean {
        return false;
    }

    public render(): JSX.Element {
        const type: SlotType = AraSlotService.resolveTypeFromIdentifier(this.props.identifier);
        return (
            <RaisedButton
                onClick={this._onClick}
                backgroundColor={this._getStatusColor()}
                icon={this._getIcon()}
                style={Slot._getStyles(type)}
            />
        );
    } 
}

export default Slot;