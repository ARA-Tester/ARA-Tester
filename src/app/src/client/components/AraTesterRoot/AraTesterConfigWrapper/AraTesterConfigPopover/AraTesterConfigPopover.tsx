import * as React from 'react';
import Popover from 'material-ui/Popover';
import SettingsButton from './../../../SettingsButton';
import AraTesterWrapperState from './../../../DisabledProp';
import StyleProp from './../../../StyleProp';
import AraTesterAxisId from './../../../../../share/AraTesterAxisId';
import DisabledProp from './../../../DisabledProp';
import AraTesterConfig from './AraTesterConfig';
const { div } = React.DOM;

export interface AraTesterConfigPopoverProps extends AraTesterAxisId, StyleProp, DisabledProp {

}

export interface AraTesterConfigPopoverState {
    open: boolean;
    anchorEl?: Element;
}

export default class AraTesterConfigPopover extends React.Component<AraTesterConfigPopoverProps, AraTesterConfigPopoverState> {
    public onClick: React.MouseEventHandler;
    public onRequestClose: () => void;

    public constructor(props: AraTesterConfigPopoverProps) {
        super(props);
        this.state = { open: false };
        this.onClick = this.handleClick.bind(this);
        this.onRequestClose = this.handleRequestClose.bind(this);
    }

    public shouldComponentUpdate(props: AraTesterConfigPopoverProps, state: AraTesterConfigPopoverState): boolean {
        const propsChange: boolean = (this.props.axisId !== props.axisId) || (this.props.disabled !== props.disabled);
        const stateChange: boolean = (this.state.open !== state.open) || (this.state.anchorEl !== state.anchorEl);
        return propsChange || stateChange;
    }

    public handleClick(event: React.MouseEvent) {
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget as Element
        });
    }

    public handleRequestClose() {
        this.setState({ open: false });
    }

    public render(): JSX.Element {
        const { props, state, onRequestClose, onClick } = this;
        const { disabled, style } = props;
        const { open, anchorEl } = state;
        return (
            <div style={style}>
                <SettingsButton disabled={disabled} onClick={onClick} />
                <Popover open={open} anchorEl={anchorEl} onRequestClose={onRequestClose} >
                    <AraTesterConfig {...props} />
                </Popover>
            </div>
        );
    }
};