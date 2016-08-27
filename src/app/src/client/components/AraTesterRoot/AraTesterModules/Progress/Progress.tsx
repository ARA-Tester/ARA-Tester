import * as React from 'react';
import { LinearStepper, RequestStepTransitionHandler,  }  from './../LinearStepper';
import { TextInputField, TextInputFieldValueHandler } from './../TextInputField/TextInputField';
import { Slots, SlotSelectionHandler, AraSizeStyle } from './../Slots/Slots';
import { AraSlot, AraSlotIdentifier } from './../Slots/AraSlot';
import { AraSlots, AraSlotService } from './../Slots/AraSlotService';
import { AttachedModuleToSlot, AttachedModuleToSlotResponse, ResponseHandler } from './AttachedModuleToSlot';
import { Modules, RemoveModuleHandler } from './Modules';

const { div } = React.DOM;

interface ProgressState {
    stepIndex?: number;
    slots?: AraSlots;
    name?: string;
    newSlot?: AraSlotIdentifier;
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

    private _handleRequestStepTransition(from: number, to: number): void {
        this.setState({ stepIndex: to < 3 ? to : 0 });
    }

    private _getStepContent(step: number): JSX.Element {
        const { state, _onName, _onSlotSelection, _onResponse, _onRemoveModule } = this;
        const { name, slots, newSlot } = state;
        const mergedOption: boolean = Progress._askForMergedOption(slots, newSlot);
        let actions: Array<JSX.Element>;
        switch (step) {
            case 0: return  (
                <div>
                    <div style={{ width: 2 * AraSizeStyle.width, margin: 'auto' }}>
                        <div style={{float: 'left'}}>
                            <Slots slots={slots} onSlotSelection={_onSlotSelection} />
                        </div>
                        <div style={{float: 'right'}}>
                            <Modules modules={slots} onRemoveModule={_onRemoveModule} />
                        </div>
                    </div>
                    <AttachedModuleToSlot slot={newSlot} onResponse={_onResponse} mergedOption={mergedOption} />
                </div>
            );
            default: return <TextInputField id="ivo" value={name} onValue={_onName} />;
        }
    }

    private _isNextStepTransitionAllowed(): boolean {
        switch(this.state.stepIndex) {
            case 0: return this.state.slots.length > 0;
            default: return false;
        }
    }

    public constructor(props: void) {
        super(props);
        this.state = {
            stepIndex: 0,
            slots: [],
            name: '',
            newSlot: undefined
         };
        this._onName = this._handleName.bind(this);
        this._onSlotSelection = this._handleSlotSelection.bind(this);
        this._onResponse = this._handleResponse.bind(this);
        this._onRemoveModule = this._handleRemoveModule.bind(this);
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
