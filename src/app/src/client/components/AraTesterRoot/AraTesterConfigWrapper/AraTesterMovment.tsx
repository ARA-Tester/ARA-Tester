import * as React from 'react';
import List  from 'material-ui/List';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import { yellow500 } from 'material-ui/styles/colors';
import { default as NumberInput, NumberInputValueHandler } from './../../NumberInput';
import { ButtonSelect, SelectableButton, SelectHandler } from './../../ButtonSelect/ButtonSelect';
import AraTesterStopButton from './../AraTesterStopButton';
import { AraTesterConfigWrapperProps } from './AraTesterConfigWrapper';
import DisabledProp from './../../DisabledProp';
import { MovmentButton, Movment } from './../../MovmentButton';
import AraTesterMovmentState from './../../../../share/AraTesterAxisMovment';
import AraTesterAxisService from './../../../services/AraTesterAxisService';

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

    public shouldComponentUpdate(props: AraTesterMovmentProps, state: AraTesterMovmentState): boolean {
        const { disabled, positive, negative } = this.props;
        const { direction, distance } = this.state;
        const propsChange: boolean = (disabled !== props.disabled) || (positive !== props.positive) || (negative !== props.negative);
        const stateChange: boolean = (direction !== state.direction) || (distance !== state.distance);
        return propsChange || stateChange;
    }

    public handleDirectionSelect(select: string): void {
        const { props, state } = this;
        this.setState({
            direction: select === props.negative,
            distance: state.distance       
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
        const { props, state, onMovmentClick, onDirectionSelect, onDistanceChange } = this;
        const { disabled, axisId, negative, positive, style } = props;
        const { direction, distance } = state;
        const movment: Movment = direction ? negative : positive;
        let movmentActionButton: JSX.Element;
        if(disabled) {
            movmentActionButton = <AraTesterStopButton axisId={axisId} />;
        } else {
            movmentActionButton = (
                <MovmentButton
                    disabled={distance === 0}
                    movment={movment}
                    onClick={onMovmentClick} />
            );
        }
        return (
            <List style={style}>
                <div>
                    <ButtonSelect
                        selected={movment}
                        buttonStyle={selectablesSpacing}
                        onSelect={onDirectionSelect} >
                            <SelectableButton value={negative} label={negative} />
                            <SelectableButton value={positive} label={positive} />
                    </ButtonSelect>
                </div>
                <div>
                    <NumberInput label="Distance (mm)" value={distance} onChange={onDistanceChange} />
                </div>
                <div>{movmentActionButton}</div>
            </List>
        );
    }
}
