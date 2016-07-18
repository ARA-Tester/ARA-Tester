import * as React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import { yellow500 } from 'material-ui/styles/colors';
import { TouchTapEvent, TouchTapEventHandler } from 'material-ui';
import { default as NumberInput, NumberInputValueHandler } from './../../../NumberInput';
import AraTesterStopButton from './../../AraTesterStopButton';
import AraTesterWrapperChildProps from './../AraTesterWrapperChildProps';
import AraTesterMovmentState from './../../../../../share/AraTesterAxisMovment';
import AraTesterAxisService from './../../../../services/AraTesterAxisService';
const { div, br } = React.DOM;

export default class AraTesterMovment extends React.Component<AraTesterWrapperChildProps, AraTesterMovmentState> {
    private _AraTesterAxisService: AraTesterAxisService;
    public onDirectionChange: (event: TouchTapEvent, index: number, menuItemValue: boolean) => void;
    public onDistanceChange: NumberInputValueHandler;
    public onMovmentTouchTap: TouchTapEventHandler;

    public constructor(props: AraTesterWrapperChildProps) {
        super(props);
        this.state = {
            direction: false,
            distance: 0
        };
        this._AraTesterAxisService = new AraTesterAxisService(this.props.axisId);
        this.onDirectionChange = this.handleDirectionChange.bind(this);
        this.onDistanceChange = this.handleDistanceChange.bind(this);
        this.onMovmentTouchTap = this.handleMovmentTouchTap.bind(this);
    }

    public handleDirectionChange(event: TouchTapEvent, index: number, menuItemValue: boolean) {
        this.setState({
            direction: menuItemValue,
            distance: this.state.distance       
        });
    }

    public handleDistanceChange(value: number) {
         this.setState({
            direction: this.state.direction,
            distance: value       
        });
    }

    public handleMovmentTouchTap(event: TouchTapEvent) {
        this._AraTesterAxisService.movmnet(this.state);
    }

    public render(): JSX.Element {
        let labelPosition: 'after' | 'before' = this.state.direction ? "after" : "before";
        let movmentActionButton: JSX.Element;
        if(this.props.disabled) {
            movmentActionButton = <AraTesterStopButton axisId={this.props.axisId} labelPosition={labelPosition} />;
        } else {
            movmentActionButton = (
                <RaisedButton
                    disabled={this.state.distance === 0}
                    label={this.state.direction ? "Backward" : "Forward"}
                    labelPosition={labelPosition}
                    icon={this.state.direction ? <ArrowBack color={yellow500} /> : <ArrowForward color={yellow500} /> }
                    onTouchTap={this.onMovmentTouchTap} />
            );
        }
        return (
            <div style={this.props.style}>
                <SelectField value={this.state.direction} onChange={this.onDirectionChange}>
                    <MenuItem value={false} primaryText="Forward" />
                    <MenuItem value={true} primaryText="Backward" />
                </SelectField>
                <br />
                <NumberInput label="Distance (mm)" value={this.state.distance} onChange={this.onDistanceChange} />
                <br />
                {movmentActionButton}
            </div>
        );
    }
}
