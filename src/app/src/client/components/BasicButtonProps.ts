import * as React from 'react';
import { TouchTapEventHandler } from 'material-ui';
import DisabledProp from './DisabledProp';
import OptionalStyleProp from './OptionalStyleProp';

interface BasicButtonProps extends DisabledProp, OptionalStyleProp {
    onTouchTap?: TouchTapEventHandler;
}

export default BasicButtonProps;