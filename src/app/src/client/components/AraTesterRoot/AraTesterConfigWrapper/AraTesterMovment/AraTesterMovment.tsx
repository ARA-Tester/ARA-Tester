import * as React from 'react';
import List  from 'material-ui/List';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import { yellow500 } from 'material-ui/styles/colors';
import { default as NumberInput, NumberInputValueHandler } from './../../../NumberInput';
import { ButtonSelect, SelectableButton, SelectHandler } from './../../../ButtonSelect/ButtonSelect';
import AraTesterStopButton from './../../AraTesterStopButton';
import { AraTesterConfigWrapperProps } from './../AraTesterConfigWrapper';
import SimpleListItem from './../../../SimpleListItem';
import DisabledProp from './../../../DisabledProp';
import MovmentButton from './../../../MovmentButton';

import AraTesterMovmentState from './../../../../../share/AraTesterAxisMovment';
import AraTesterAxisService from './../../../../services/AraTesterAxisService';
const { div } = React.DOM;

interface AraTesterMovmentProps extends AraTesterConfigWrapperProps, DisabledProp {

}

const selectablesSpacing: React.CSSProperties = { margin: 5 };

export default class AraTesterMovment extends React.Component<AraTesterMovmentProps, AraTesterMovmentState> {
    private _AraTesterAxisService: AraTesterAxisService;
    public onDirectionSelect: SelectHandler;
    public onDistanceChange: NumberInputValueHandler;
    public onMovmentClick: React.MouseEventHandler;

    public constructor(props: AraTesterMovmentProps) {
        super(props);
        this.state = {
            direction: false,
            distance: 0
        };
        this._AraTesterAxisService = new AraTesterAxisService(this.props.axisId);
        this.onDirectionSelect = this.handleDirectionSelect.bind(this);
        this.onDistanceChange = this.handleDistanceChange.bind(this);
        this.onMovmentClick = this.handleMovmentClick.bind(this);
    }

    public handleDirectionSelect(select: string): void {
        this.setState({
            direction: select === this.props.negative,
            distance: this.state.distance       
        });
    }

    public handleDistanceChange(value: number): void {
         this.setState({
            direction: this.state.direction,
            distance: value       
        });
    }

    public handleMovmentClick(event: React.MouseEvent): void {
        this._AraTesterAxisService.movment(this.state);
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
                    onClick={this.onMovmentClick} />
            );
        }
        return (
            <List style={this.props.style}>
                <SimpleListItem>
                    <ButtonSelect
                        default={this.state.direction ? this.props.negative : this.props.positive}
                        buttonStyle={selectablesSpacing}
                        onSelect={this.onDirectionSelect} >
                            <SelectableButton value={this.props.positive} label={this.props.positive} />
                            <SelectableButton value={this.props.negative} label={this.props.negative} />
                    </ButtonSelect>
                </SimpleListItem>
                <SimpleListItem>
                    <NumberInput label="Distance (mm)" value={this.state.distance} onChange={this.onDistanceChange} />
                </SimpleListItem>
                <SimpleListItem>{movmentActionButton}</SimpleListItem>
            </List>
        );
    }
}
