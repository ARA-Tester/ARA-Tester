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
import { SlotBase, AraSlot } from './AraSlot';

const Margin: number = 2;

const Size1: number = SlotSize;

const Size2: number = SlotSize * 2;

const IconSize: number = (SlotSize / 2) + (10 * Margin);

const versticalHeight: number = Size2 + (2 * Margin);

const VerticalType: React.CSSProperties = { minWidth: Size1, height: versticalHeight, float: 'left'};

const HorizontalType: React.CSSProperties = { minWidth: Size2, height: Size1 };

const MergedType: React.CSSProperties = { minWidth: Size2, height: versticalHeight, float: 'right' };

export interface SlotProps extends SlotBase {

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

    private _getTypeSize(): React.CSSProperties {
        switch(this.props.type) {
            case 'vertical': return VerticalType;
            case 'horizontal': return HorizontalType;
            case 'merged': return MergedType;
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

    private _getStyles(): React.CSSProperties {
        return Object.assign({ margin: Margin }, this._getTypeSize());
    }

    private _getIcon(): React.ReactNode {
        return React.createElement(this._getSlotIcon(), { style: { width: IconSize, height: IconSize }, color: amber500 });
    }

    public constructor(props: SlotProps) {
        super(props);
    }

    public shouldComponentUpdate(props: SlotProps): boolean {
        return false;
    }

    public render(): JSX.Element {
        return <RaisedButton backgroundColor={this._getStatusColor()} icon={this._getIcon()} style={this._getStyles()} />;
    } 
}

export default Slot;