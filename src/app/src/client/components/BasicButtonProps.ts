import * as React from 'react';
import { TouchTapEventHandler } from 'material-ui';
import DisabledProp from './DisabledProp';
import OptionalStyleProp from './OptionalStyleProp';

interface BasicButtonProps extends DisabledProp, OptionalStyleProp {
    onTouchTap?: TouchTapEventHandler;
    onTouchStart?: React.TouchEventHandler;
    onTouchEnd?: React.TouchEventHandler;
    onMouseDown?: React.MouseEventHandler;
    onMouseUp?: React.MouseEventHandler;
}

export default BasicButtonProps;