import * as React from 'react';
import SlotSize from './SlotSize';
import RaisedButton from 'material-ui/RaisedButton';
import { grey500 } from 'material-ui/styles/colors';

export const Size1: number = SlotSize;

export const Size2: number = SlotSize * 2;

export const Margin: number = 2; 

const VerticalPosition: React.CSSProperties = { minWidth: Size1, height: (Size2 + (2 * Margin)), float: 'left', margin: Margin };

const HorizontalPosition: React.CSSProperties = { minWidth: Size2, height: Size1, margin: Margin };

export type SIngleSlotPosition = 'horizontal' | 'vertical';

export interface SingleSlotProps {
    position?: SIngleSlotPosition;
    style?: React.CSSProperties;
}

export class SingleSlot extends React.Component<SingleSlotProps, void> {
    public static defaultProps: SingleSlotProps = { position: 'vertical' };

    public constructor(props: SingleSlotProps) {
        super(props);
    }

    public shouldComponentUpdate(props: SingleSlotProps): boolean {
        return false;
    }

    public render(): JSX.Element {
        const { position, style } = this.props;
        const ownStyle: React.CSSProperties = position === 'horizontal' ? HorizontalPosition : VerticalPosition;
        const mergedStyle: React.CSSProperties = Object.assign({}, ownStyle, style);
        return <RaisedButton backgroundColor={grey500} label=" " style={mergedStyle} />;
    } 
}

export default SingleSlot;