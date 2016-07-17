import * as React from 'react';
import { TouchTapEventHandler, TouchTapEvent } from 'material-ui';
import Popover from 'material-ui/Popover';
import ConfigButton from './../../../ConfigButton';
import AraTesterWrapperChildProps from './../AraTesterWrapperChildProps';
import AraTesterConfig from './AraTesterConfig/AraTesterConfig';
const { div } = React.DOM;

export interface AraTesterConfigPopoverState {
    open: boolean;
    anchorEl?: Element;
}

export default class AraTesterConfigPopover extends React.Component<AraTesterWrapperChildProps, AraTesterConfigPopoverState> {
    public onTouchTab: TouchTapEventHandler;
    public onRequestClose: () => void;

    public constructor(props: AraTesterWrapperChildProps) {
        super(props);
        this.state = {
            open: false
        };
        this.onTouchTab = this.handleTouchTab.bind(this);
        this.onRequestClose = this.handleRequestClose.bind(this);
    }

    public handleTouchTab(event: TouchTapEvent) {
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
                <ConfigButton disabled={this.props.disabled} onTouchTap={this.onTouchTab} />
                <Popover open={this.state.open} anchorEl={this.state.anchorEl} onRequestClose={this.onRequestClose} >
                    <AraTesterConfig {...this.props} />
                </Popover>
            </div>
        );
    }
};