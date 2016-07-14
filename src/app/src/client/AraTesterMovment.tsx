import * as React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import { yellow500 } from 'material-ui/styles/colors';
import { TouchTapEvent, TouchTapEventHandler } from 'material-ui';
import { default as NumberInput, NumberInputValueHandler } from './NumberInput';
import { AraTesterConfigProps } from './AraTesterConfig';
const { div, br } = React.DOM;

interface AraTesterMovmentState {
    direction: boolean;
    distance: number;
}

export default class AraTesterMovment extends React.Component<AraTesterConfigProps, AraTesterMovmentState> {
    public onDirectionChange: (event: TouchTapEvent, index: number, menuItemValue: boolean) => void;
    public onDistanceChange: NumberInputValueHandler;
    public onMovmentTouchTap: TouchTapEventHandler;

    public constructor(props: AraTesterConfigProps) {
        super(props);
        this.state = {
            direction: false,
            distance: 0
        };
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
        console.log('movmnet');
    }

    public render(): JSX.Element {
        return (
            <div style={this.props.style}>
                <SelectField value={this.state.direction} onChange={this.onDirectionChange}>
                    <MenuItem value={false} primaryText="Forward" />
                    <MenuItem value={true} primaryText="Backward" />
                </SelectField>
                <br />
                <NumberInput label="Distance (mm)" value={this.state.distance} onChange={this.onDistanceChange} />
                <br />
                <RaisedButton
                    disabled={this.state.distance === 0}
                    label={this.state.direction ? "Backward" : "Forward"}
                    labelPosition="before"
                    icon={this.state.direction ? <ArrowBack color={yellow500} /> : <ArrowForward color={yellow500} /> }
                    onTouchTap={this.onMovmentTouchTap} />
            </div>
        );
    }
}