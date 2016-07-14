import * as React from 'react';
import { TouchTapEventHandler, TouchTapEvent } from 'material-ui';
import Popover from 'material-ui/Popover';
import ConfigButton from './ConfigButton';
import { default as AraTesterConfig, AraTesterConfigProps } from './AraTesterConfig';
const { div } = React.DOM;

interface AraTesterConfigPopoverState {
    open: boolean;
    anchorEl?: Element;
}

export default class AraTesterConfigPopover extends React.Component<AraTesterConfigProps, AraTesterConfigPopoverState> {
    public onTouchTab: TouchTapEventHandler;
    public onRequestClose: () => void;

    public constructor(props: AraTesterConfigProps) {
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
                <ConfigButton onTouchTap={this.onTouchTab} />
                <Popover open={this.state.open} anchorEl={this.state.anchorEl} onRequestClose={this.onRequestClose} >
                    <AraTesterConfig {...this.props} />
                </Popover>
            </div>
        );
    }
};