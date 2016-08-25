import * as React from 'react';
import SlotSize from './SlotSize';
import RaisedButton from 'material-ui/RaisedButton';
import { grey500 } from 'material-ui/styles/colors';

const Size1: number = SlotSize;

const Size2: number = SlotSize * 2;

const Margin: number = 2;

const versticalHeight: number = Size2 + (2 * Margin);

const VerticalPosition: React.CSSProperties = { minWidth: Size1, height: versticalHeight, float: 'left'};

const HorizontalPosition: React.CSSProperties = { minWidth: Size2, height: Size1 };

const MergedPosition: React.CSSProperties = { minWidth: Size2, height: versticalHeight, float: 'right' };

export type SlotPosition = 'horizontal' | 'vertical' | 'merged';

export interface SlotProps {
    position: SlotPosition;
}

export class Slot extends React.Component<SlotProps, void> {
    public static margin: number = Margin;
    public static verticalPosition: React.CSSProperties = VerticalPosition;
    public static horizontalPosition: React.CSSProperties = HorizontalPosition;
    public static mergedPosition: React.CSSProperties = MergedPosition;

    private _getPositionSize(): React.CSSProperties {
        switch(this.props.position) {
            case 'vertical': return VerticalPosition;
            case 'horizontal': return HorizontalPosition;
            case 'merged': return MergedPosition;
        }
    }

    private _getStyles(): React.CSSProperties {
        return Object.assign({ margin: Margin }, this._getPositionSize());
    }

    public constructor(props: SlotProps) {
        super(props);
    }

    public shouldComponentUpdate(props: SlotProps): boolean {
        return false;
    }

    public render(): JSX.Element {
        return <RaisedButton backgroundColor={grey500} label=" " style={this._getStyles()} />;
    } 
}

export default Slot;