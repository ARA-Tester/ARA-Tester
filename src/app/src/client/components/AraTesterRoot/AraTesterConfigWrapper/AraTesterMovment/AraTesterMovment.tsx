import * as React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import { yellow500 } from 'material-ui/styles/colors';
import { TouchTapEvent, TouchTapEventHandler } from 'material-ui';
import { default as NumberInput, NumberInputValueHandler } from './../../../NumberInput';
import AraTesterStopButton from './../../AraTesterStopButton';
import { AraTesterConfigWrapperProps } from './../AraTesterConfigWrapper';
import DisabledProp from './../../../DisabledProp';
import MovmentButton from './../../../MovmentButton';
import { Flex, Item } from 'react-flex';
import 'react-flex/index.css';
import AraTesterMovmentState from './../../../../../share/AraTesterAxisMovment';
import AraTesterAxisService from './../../../../services/AraTesterAxisService';
const { div } = React.DOM;

interface AraTesterMovmentProps extends AraTesterConfigWrapperProps, DisabledProp {

}

export default class AraTesterMovment extends React.Component<AraTesterMovmentProps, AraTesterMovmentState> {
    private _AraTesterAxisService: AraTesterAxisService;
    public onDirectionChange: (event: TouchTapEvent, index: number, menuItemValue: boolean) => void;
    public onDistanceChange: NumberInputValueHandler;
    public onMovmentTouchTap: TouchTapEventHandler;

    public constructor(props: AraTesterMovmentProps) {
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
        let movmentActionButton: JSX.Element;
        if(this.props.disabled) {
            movmentActionButton = <AraTesterStopButton axisId={this.props.axisId} />;
        } else {
            movmentActionButton = (
                <MovmentButton
                    disabled={this.state.distance === 0}
                    movment={this.state.direction ? this.props.negative : this.props.positive}
                    onTouchTap={this.onMovmentTouchTap} />
            );
        }
        return (
            <div style={this.props.style}>
                <Flex column justifyContent="center" alignContent="center" alignItems="center">
                    <Item flex>
                        <SelectField value={this.state.direction} onChange={this.onDirectionChange}>
                            <MenuItem value={false} primaryText={this.props.positive} />
                            <MenuItem value={true} primaryText={this.props.negative} />
                        </SelectField>
                    </Item>
                    <Item flex>
                        <NumberInput label="Distance (mm)" value={this.state.distance} onChange={this.onDistanceChange} />
                    </Item>
                    <Item flex>
                        {movmentActionButton}
                    </Item>
                </Flex>
            </div>
        );
    }
}
