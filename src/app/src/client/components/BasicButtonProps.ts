import * as React from 'react';
import DisabledProp from './DisabledProp';
import StyleProp from './StyleProp';

interface BasicButtonProps extends DisabledProp, StyleProp {
    onClick?: React.MouseEventHandler;
}

export default BasicButtonProps;