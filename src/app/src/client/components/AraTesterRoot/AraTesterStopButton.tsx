import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionPause from 'material-ui/svg-icons/av/pause';
import { fullWhite, red500 } from 'material-ui/styles/colors';
import StyleProp from './../StyleProp';
import AraTesterAxisId from './../../../share/AraTesterAxisId';
import AraTesterAxisService from './../../services/AraTesterAxisService';

export interface AraTesterStopButtonProps extends AraTesterAxisId, StyleProp {

}

export default class AraTesterStopButton extends React.Component<AraTesterStopButtonProps, void> {
    private _AraTesterAxisService: AraTesterAxisService;
    public onClick: React.MouseEventHandler;

    public constructor(props: AraTesterStopButtonProps) {
        super(props);
        this.onClick = this.handleClick.bind(this);
        this._AraTesterAxisService = new AraTesterAxisService(this.props.axisId);
    }

    public shouldComponentUpdate(props: AraTesterStopButtonProps, state: void): boolean {
        return false;
    }

    public handleClick(event: React.MouseEvent): void {
        this._AraTesterAxisService.stop();
    }

    public render(): JSX.Element {
        return <RaisedButton
            style={this.props.style}
            backgroundColor={red500}
            icon={<ActionPause color={fullWhite} />}
            onClick={this.onClick} />;
    }
};