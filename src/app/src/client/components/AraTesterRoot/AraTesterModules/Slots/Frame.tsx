import * as React from 'react';
import SlotSize from './SlotSize';
import RaisedButton from 'material-ui/RaisedButton';
import ARA from 'material-ui/svg-icons/action/settings-ethernet';
import Speaker from 'material-ui/svg-icons/navigation/more-horiz';
import { pinkA400, red700 } from 'material-ui/styles/colors';

const UpHeight: number = SlotSize / 3;

const DownHeight: number = SlotSize * 2;

export const FrameColor: string = pinkA400;

export type FramePart = 'up' | 'down';

export interface FrameProps {
    part: FramePart;
}

export class Frame extends React.Component<FrameProps, void> {
    public static frameColor: string = FrameColor;
    public static upHeight: number = UpHeight;
    public static downHeight: number = DownHeight;

    private static _renderFrame(icon: JSX.Element, size: number, height: number): JSX.Element {
        const sizedIcon: JSX.Element = React.cloneElement(icon, { style: { width: size, height: size }, color: red700 });
        return <RaisedButton icon={sizedIcon} disabled fullWidth style={{ height: height }} disabledBackgroundColor={pinkA400} />;
    }

    public constructor(props: FrameProps) {
        super(props);
    }

    public shouldComponentUpdate(props: FrameProps): boolean {
        return false;
    }

    public render(): JSX.Element {
        const { part } = this.props;
        const { _renderFrame } = Frame;
        return part === 'up' ? _renderFrame(<Speaker />, UpHeight - (UpHeight / 10), UpHeight) : _renderFrame(<ARA />, SlotSize + (SlotSize / 10), DownHeight);
    } 
}

export default Frame;