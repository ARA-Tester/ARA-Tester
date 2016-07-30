import * as React from 'react';
import DisabledProp from './DisabledProp';
import OptionalStyleProp from './OptionalStyleProp';

interface BasicButtonProps extends DisabledProp, OptionalStyleProp {
    onClick?: React.MouseEventHandler;
}

export default BasicButtonProps;