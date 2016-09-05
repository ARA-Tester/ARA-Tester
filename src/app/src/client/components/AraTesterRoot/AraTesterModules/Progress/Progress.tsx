import * as React from 'react';
import { TouchTapEventHandler, TouchTapEvent } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import { NumberInputField, NumberInputFieldValueHandler } from './../TextInputField/NumberInputField';
import { LinearStepper, RequestStepTransitionHandler }  from './../LinearStepper';
import { TextInputField, TextInputFieldValueHandler } from './../TextInputField/TextInputField';
import { Slots, SlotSelectionHandler, AraSizeStyle } from './../Slots/Slots';
import { AraSlot, AraSlotIdentifier } from './../Slots/AraSlot';
import { AraSlots, AraSlotService } from './../Slots/AraSlotService';
import { AttachedModuleToSlot, AttachedModuleToSlotResponse, ResponseHandler } from './AttachedModuleToSlot';
import { Modules, RemoveModuleHandler } from './Modules';
import { ModulesTestOrder, ModulesOrder, ModuleOrder, ModulesOrderChangeHandler } from './ModulesTestOrder';
import { arrayMove } from 'react-sortable-hoc';

const { div } = React.DOM;

const RaisedButtonWidth: number = 90;

const RaisedButtonStyle: React.CSSProperties = { minWidth: RaisedButtonWidth, width: RaisedButtonWidth };

const CenterRaisedButtonStyle: React.CSSProperties = { margin: 'auto', width: RaisedButtonWidth };

const ContainerWidth: number = AraSizeStyle.width * 2;

const ToggleWidth: number = ContainerWidth * (2 / 3);

const NumberInputFieldWidth: number = ContainerWidth - ToggleWidth

const equalityHeight: number = 30;

const ToggleStyle: React.CSSProperties = {
    width: ToggleWidth,
    height: equalityHeight,
    float: 'left'
};

const NumberInputFieldStyle: React.CSSProperties = {
    width: NumberInputFieldWidth,
    height: equalityHeight,
    float: 'right'
};

interface ProgressState {
    stepIndex?: number;
    slots?: AraSlots;
    name?: string;
    newSlot?: AraSlotIdentifier;
    order?: ModulesOrder;
    equalTimes?: boolean;
    equalValue?: number;
}

export default class Progress extends React.Component<void, ProgressState> {
    private static _resolveMergedSlotIdentifier(identifier: AraSlotIdentifier): AraSlotIdentifier {
        switch(identifier) {
            case 'horizontal1': return 'merged1';
            case 'horizontal2': return 'merged1';
            case 'horizontal3': return 'merged2';
            case 'horizontal4': return 'merged2';
        }
    }

    private static _resolveHorizontalNeighborSlotIdentifier(identifier: AraSlotIdentifier): AraSlotIdentifier {
        switch(identifier) {
            case 'horizontal1': return 'horizontal2';
            case 'horizontal2': return 'horizontal1';
            case 'horizontal3': return 'horizontal4';
            case 'horizontal4': return 'horizontal3';
        }
    }

    private static _randomShuffler(): number {
        return Math.random() - Math.random();
    }

    private static _randomTimes(moduleOrder: ModuleOrder): ModuleOrder {
        let mutable: ModuleOrder = Object.assign({}, moduleOrder);
        mutable.times = Math.floor(Math.random() * 9999999);
        return mutable;
    }

    private static _askForMergedOption(slots: AraSlots, identifier: AraSlotIdentifier): boolean {
        if((identifier === undefined) || (!AraSlotService.isIdentifierHorizontal(identifier))) {
            return false;
        } else {
            const neighborIdentifier: AraSlotIdentifier = Progress._resolveHorizontalNeighborSlotIdentifier(identifier);
            const neighborSlot: AraSlot = AraSlotService.findSlotByIdentifier(slots, neighborIdentifier);
            return !AraSlotService.isSlot(neighborSlot);
        }
    }

    private _onName: TextInputFieldValueHandler;
    private _onSlotSelection: SlotSelectionHandler;
    private _onResponse: ResponseHandler;
    private _onRemoveModule: RemoveModuleHandler;
    private _onRandomModulesOrder: TouchTapEventHandler;
    private _onEqualTimesToggle: (event: React.MouseEvent, toggled: boolean) => void;
    private _onEqualValue: NumberInputFieldValueHandler;
    private _onModuleTimesChange: ModulesOrderChangeHandler;
    private _onModulesOrderChange: ModulesOrderChangeHandler;
    private _onRequestStepTransition: RequestStepTransitionHandler;

    private _addSlot(identifier: AraSlotIdentifier): void {
        const slots: AraSlots = [...this.state.slots, AraSlotService.createModuleAraSlot(identifier)];
        this.setState({ slots: slots, newSlot: undefined });
    }

    private _handleName(name: string): void {
        this.setState({ name: name });
    }

    private _handleSlotSelection(slot: AraSlotIdentifier): void {
        this.setState({ newSlot: slot });
    }

    private _handleResponse(response: AttachedModuleToSlotResponse): void {
        switch(response) {
            case 'no':
                this.setState({ newSlot: undefined });
                return;
            case 'single':
                this._addSlot(this.state.newSlot);
                return;
            case 'merged':
                this._addSlot(Progress._resolveMergedSlotIdentifier(this.state.newSlot));
                return;
        }
    }

    private _handleRemoveModule(index: number): void {
        const { slots } = this.state;
        this.setState({ slots: slots.slice(0, index).concat(slots.slice(index + 1)) });
    }

    private _handleRandomModulesOrder(event: TouchTapEvent): void {
        let mutable: ModulesOrder = [...this.state.order];
        let randomized: ModulesOrder = mutable.sort(Progress._randomShuffler);
        if(!this.state.equalTimes) {
             randomized = randomized.map(Progress._randomTimes);
        }
        this.setState({ order: randomized });
    }

    private _equalizeValues(value: number): ProgressState {
        let mutable: ModulesOrder = [...this.state.order];
        const equaled: ModulesOrder = mutable.map((moduleOrder: ModuleOrder): ModuleOrder => {
            return Object.assign(moduleOrder, { times: value });
        });
        return { order: equaled, equalValue: value };
    }

    private _handleEqualTimesToggle(event: React.MouseEvent, toggled: boolean): void {
        this.setState(Object.assign({ equalTimes: toggled }, this._equalizeValues(1)));
    }

    private _handleEqualValue(value: number): void {
        this.setState(this._equalizeValues(value));
    }

    private _handleModuleTimesChange(index: number, times: number): void {
        let mutable: ModulesOrder = [...this.state.order];
        mutable[index].times = times;
        this.setState({ order: mutable });
    }

    private _handleModulesOrderChange(oldIndex: number, newIndex: number): void {
        let mutable: ModulesOrder = [...this.state.order];
        this.setState({ order: arrayMove(mutable, oldIndex, newIndex) });
    }

    private _handleRequestStepTransition(from: number, to: number): void {
        switch(to) {
            case 1:
                const order: ModulesOrder = this.state.slots.map((slot: AraSlot, index: number): ModuleOrder => {
                    return Object.assign({ index: index, times: 1 }, slot);
                })
                this.setState({ order: order });
                break;
        }
        this.setState({ stepIndex: to < 3 ? to : 0 });
    }

    private _getStepContent(step: number): JSX.Element {
        const { name, slots, newSlot, order, equalTimes, equalValue } = this.state;
        switch (step) {
            case 0:
                const mergedOption: boolean = Progress._askForMergedOption(slots, newSlot);
                return  (
                    <div>
                        <div style={{ width: ContainerWidth, margin: 'auto' }}>
                            <div style={{float: 'left'}}>
                                <Slots slots={slots} onSlotSelection={this._onSlotSelection} />
                            </div>
                            <div style={{float: 'right'}}>
                                <Modules modules={slots} onRemoveModule={this._onRemoveModule} />
                            </div>
                        </div>
                        <AttachedModuleToSlot slot={newSlot} onResponse={this._onResponse} mergedOption={mergedOption} />
                    </div>
                );
            case 1:
                let numberInputField: JSX.Element;
                if(equalTimes) {
                    numberInputField = (
                        <NumberInputField
                            fieldValue={equalValue}
                            onFieldValue={this._onEqualValue}
                            id="equal-times-input"
                            style={NumberInputFieldStyle} />
                    );
                }
                return  (
                    <div>
                        <div style={{ width: ContainerWidth, margin: 'auto' }}>
                            <div>
                                <div style={CenterRaisedButtonStyle}>
                                    <RaisedButton
                                        primary
                                        label="Random"
                                        style={RaisedButtonStyle}
                                        onTouchTap={this._onRandomModulesOrder} />
                                </div>
                                <div>
                                    <Toggle
                                        label="Test all modules equal times"
                                        labelPosition="right"
                                        onToggle={this._onEqualTimesToggle}
                                        toggled={equalTimes}
                                        style={ToggleStyle} />
                                    {numberInputField}
                                </div>
                            </div>
                            <div style={{float: 'left'}}>
                                <Slots slots={slots} />
                            </div>
                            <div style={{float: 'right'}}>
                                <ModulesTestOrder
                                    order={order}
                                    disabledInputs={equalTimes}
                                    onModuleTimesChange={this._onModuleTimesChange}
                                    onModulesOrderChange={this._onModulesOrderChange} />
                            </div>
                        </div>
                    </div>
            );
            default: return <TextInputField id="ivo" fieldValue={name} onFieldValue={this._onName} />;
        }
    }

    private _isNextStepTransitionAllowed(): boolean {
        switch(this.state.stepIndex) {
            case 0: return this.state.slots.length > 0;
            default: return true;
        }
    }

    public constructor(props: void) {
        super(props);
        this.state = {
            stepIndex: 0,
            slots: [],
            name: '',
            newSlot: undefined,
            equalTimes: false
        };
        this._onName = this._handleName.bind(this);
        this._onSlotSelection = this._handleSlotSelection.bind(this);
        this._onResponse = this._handleResponse.bind(this);
        this._onRemoveModule = this._handleRemoveModule.bind(this);
        this._onRandomModulesOrder = this._handleRandomModulesOrder.bind(this);
        this._onEqualTimesToggle = this._handleEqualTimesToggle.bind(this);
        this._onEqualValue = this._handleEqualValue.bind(this);
        this._onModuleTimesChange = this._handleModuleTimesChange.bind(this);
        this._onModulesOrderChange = this._handleModulesOrderChange.bind(this);
        this._onRequestStepTransition = this._handleRequestStepTransition.bind(this);
    }

    public render(): JSX.Element {
        const { state, _onRequestStepTransition } = this; 
        const { stepIndex, slots } = state;
        let stepLabels: Array<string> = ['Modules selection'];
        slots.forEach((slot: AraSlot, index: number): void => {
            stepLabels.push(`Module ${index + 1} training`);
        });
        return (
            <LinearStepper
                stepLabels={stepLabels}
                activeStep={stepIndex}
                stepCompleted={this._isNextStepTransitionAllowed()}
                stepContent={this._getStepContent(stepIndex)}
                onRequestStepTransition={_onRequestStepTransition}
            />
        )
    }
}
