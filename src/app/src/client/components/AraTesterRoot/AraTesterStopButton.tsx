import * as React from 'react';
import { TouchTapEventHandler, TouchTapEvent } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import ActionPause from 'material-ui/svg-icons/av/pause';
import { fullWhite, red500 } from 'material-ui/styles/colors';
import OptionalStyleProp from './../OptionalStyleProp';
import AraTesterAxisId from './../../../share/AraTesterAxisId';
import AraTesterAxisService from './../../services/AraTesterAxisService';

export interface AraTesterStopButtonProps extends AraTesterAxisId, OptionalStyleProp {

}

export default class AraTesterStopButton extends React.Component<AraTesterStopButtonProps, void> {
    private _AraTesterAxisService: AraTesterAxisService;
    public onTouchTap: TouchTapEventHandler;

    public constructor(props: AraTesterStopButtonProps) {
        super(props);
        this.onTouchTap = this.handleTouchTap.bind(this);
        this._AraTesterAxisService = new AraTesterAxisService(this.props.axisId);
    }

    public handleTouchTap(event: TouchTapEvent): void {
        this._AraTesterAxisService.stop();
    }

    public render(): JSX.Element {
        return <RaisedButton
            style={this.props.style}
            backgroundColor={red500}
            label="Stop"
            icon={<ActionPause color={fullWhite} />}
            onTouchTap={this.onTouchTap} />;
    }
};