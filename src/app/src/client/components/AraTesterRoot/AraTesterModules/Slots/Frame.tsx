import * as React from 'react';
import SlotSize from './SlotSize';
import RaisedButton from 'material-ui/RaisedButton';
import ARA from 'material-ui/svg-icons/action/settings-ethernet';
import { pinkA400, red700 } from 'material-ui/styles/colors';

export const UpHeight: number = SlotSize / 4;

export const DownHeight: number = SlotSize * 2;

export type FramePart = 'up' | 'down';

export interface FrameProps {
    part: FramePart;
}

export class Frame extends React.Component<FrameProps, void> {
    public constructor(props: FrameProps) {
        super(props);
    }

    public shouldComponentUpdate(props: FrameProps): boolean {
        return false;
    }

    public render(): JSX.Element {
        const { part } = this.props;
        let frame: JSX.Element = <RaisedButton disabled fullWidth disabledBackgroundColor={pinkA400} />;
        if(part === 'up') {
            return React.cloneElement(frame, { label: ' ', style: { height: UpHeight }});
        } else {
            const size: number = SlotSize;
            const iconStyle: React.CSSProperties = { width: size, height: size };
            const icon: React.ReactNode = <ARA style={iconStyle} color={red700} />;
            return React.cloneElement(frame, { icon: icon , style: { height: DownHeight }});
        }
    } 
}

export default Frame;