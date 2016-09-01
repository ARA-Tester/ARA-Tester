import * as React from 'react';
import EnhancedButton from 'material-ui/internal/EnhancedButton';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Slot from './../Slots/Slot';
import AraSlotService from './../Slots/AraSlotService';
import AraSlot from './../Slots/AraSlot';
import { AraSizeStyle } from './../Slots/Slots';
import { floatLeftStyle, EnhancedButtonStyle, IconStyle, TextStyle } from './Modules';
import { SortableElement, SortableContainer, SortEndHandler, SortEnd, SortEvent } from 'react-sortable-hoc';
import { NumberInputField, NumberInputFieldValueHandler } from './../TextInputField/NumberInputField';

const { div } = React.DOM;

const Margin: number = 24;

const NumberInputmargin: number = 2 * Margin;

const NumberInputWidth: number = AraSizeStyle.width - NumberInputmargin;

const NumberInputStyle: React.CSSProperties = floatLeftStyle({
    marginLeft: Margin,
    marginRight: Margin,
    width: NumberInputWidth
});

export interface ModuleOrder extends AraSlot {
    times: number;
}

export type ModulesOrder = Array<ModuleOrder>;

export type ModulesOrderChangeHandler = (index: number, times: number) => void;

export interface OrdarableModuleProps {
    order: ModuleOrder;
    onModuleTimesChange: NumberInputFieldValueHandler;
}

export interface OrdarableModulesProps {
    order: ModulesOrder;
    onModuleTimesChange: ModulesOrderChangeHandler;
}

export interface ModulesTestOrderProps extends OrdarableModulesProps {
    onModulesOrderChange: ModulesOrderChangeHandler;
}

export const OrdarableModule = SortableElement((props: OrdarableModuleProps): JSX.Element => {
    const { order, onModuleTimesChange } = props;
    const slot: AraSlot = order;
    const moduleIndex: number = slot.index + 1;
    const moduleType: string = !AraSlotService.isSlotMerged(slot) ? 'single' : 'double';
    return (
        <EnhancedButton
            containerElement="div"
            disableFocusRipple
            disableTouchRipple
            style={EnhancedButtonStyle}>
                {React.cloneElement(Slot.getSlotIcon(slot), { style: IconStyle })}
                <div style={TextStyle}>
                    <div>{`Module ${moduleIndex}`}</div>
                    <div>{moduleType}</div>
                </div>
        </EnhancedButton>
    );
});

export const OrdarableModules = SortableContainer(
    class extends React.Component<OrdarableModulesProps, void> {
        private _moduleTimesChangeFunctionFactory: (index: number) => NumberInputFieldValueHandler;

        private _moduleTimesChangeFactory(index: number): NumberInputFieldValueHandler {
            return this.props.onModuleTimesChange.bind(this, index);
        }

        public constructor(props: OrdarableModulesProps) {
            super(props);
            this._moduleTimesChangeFunctionFactory = this._moduleTimesChangeFactory.bind(this);
        }

        public render(): JSX.Element {
            const { order } = this.props;
            const { length } = order;
            let modules: Array<JSX.Element> = [];
            this.props.order.forEach((moduleOrder: ModuleOrder, index: number): void => {
                const onModuleTimesChange: NumberInputFieldValueHandler = this._moduleTimesChangeFunctionFactory(index);
                modules.push(
                    <OrdarableModule
                        key={index}
                        index={index}
                        order={moduleOrder}
                        onModuleTimesChange={onModuleTimesChange}
                    />
                );
                modules.push(<Divider key={index + length } />);
            });
            return (
                <div style={AraSizeStyle}>
                    {modules}
                </div>
            );
        }
    }
);

export class ModulesTestOrder extends React.Component<ModulesTestOrderProps, void> {
    private _onSortEnd: SortEndHandler;

    private _handleSortEnd(sort: SortEnd, event: SortEvent): void {
        this.props.onModulesOrderChange(sort.oldIndex, sort.newIndex);
    }

    public constructor(props: ModulesTestOrderProps) {
        super(props);
        this._onSortEnd = this._handleSortEnd.bind(this);
    }

    public render(): JSX.Element {
        const { props, _onSortEnd } = this;
        const { order, onModuleTimesChange } = props;
        return (
            <OrdarableModules
                order={order}
                onSortEnd={_onSortEnd}
                onModuleTimesChange={onModuleTimesChange}
            />
        );
    }
}

export default ModulesTestOrder;