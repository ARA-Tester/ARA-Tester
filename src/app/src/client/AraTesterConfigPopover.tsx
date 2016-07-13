import * as React from 'react';
import Popover from 'material-ui/Popover';
import ConfigButton from './ConfigButton';
import {default as AraTesterConfig, AraTesterConfigProps } from './AraTesterConfig';
const { DOM, Component } = React;
const { div } = DOM;

interface AraTesterConfigPopoverState {
    open: boolean;
    anchorEl?: Element;
}

export default class AraTesterConfigPopover extends Component<AraTesterConfigProps, AraTesterConfigPopoverState> {
    public onTouchTab: (event: any) => void;
    public onRequestClose: () => void;

    public constructor(props: AraTesterConfigProps) {
        super(props);
        this.state = {
            open: false
        };
        this.onTouchTab = this.handleTouchTab.bind(this);
        this.onRequestClose = this.handleRequestClose.bind(this);
    }

    public handleTouchTab(event: any) {
        let eventCast: Event = event as Event;
        eventCast.preventDefault();
        this.setState({
            open: true,
            anchorEl: eventCast.currentTarget as Element
        });
    }

    public handleRequestClose() {
        this.setState({
            open: false
        });
    }

    render() {
        return (
            <div>
                <ConfigButton onTouchTap={this.onTouchTab} />
                <Popover open={this.state.open} anchorEl={this.state.anchorEl} onRequestClose={this.onRequestClose} >
                    <AraTesterConfig {...this.props} />
                </Popover>
            </div>
        );
    }
};