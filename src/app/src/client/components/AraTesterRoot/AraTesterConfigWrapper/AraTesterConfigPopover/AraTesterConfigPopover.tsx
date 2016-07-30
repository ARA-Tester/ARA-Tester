import * as React from 'react';
import Popover from 'material-ui/Popover';
import SettingsButton from './../../../SettingsButton';
import AraTesterWrapperState from './../../../DisabledProp';
import OptionalStyleProp from './../../../OptionalStyleProp';
import AraTesterAxisId from './../../../../../share/AraTesterAxisId';
import DisabledProp from './../../../DisabledProp';
import AraTesterConfig from './AraTesterConfig/AraTesterConfig';
const { div } = React.DOM;

export interface AraTesterConfigPopoverProps extends AraTesterAxisId, OptionalStyleProp, DisabledProp {

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
        this.state = {
            open: false
        };
        this.onClick = this.handleClick.bind(this);
        this.onRequestClose = this.handleRequestClose.bind(this);
    }

    public handleClick(event: React.MouseEvent) {
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget as Element
        });
    }

    public handleRequestClose() {
        this.setState({
            open: false
        });
    }

    public render(): JSX.Element {
        return (
            <div style={this.props.style}>
                <SettingsButton disabled={this.props.disabled} onClick={this.onClick} />
                <Popover open={this.state.open} anchorEl={this.state.anchorEl} onRequestClose={this.onRequestClose} >
                    <AraTesterConfig {...this.props} />
                </Popover>
            </div>
        );
    }
};