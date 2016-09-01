import * as React from 'react';
import EnhancedButton from 'material-ui/internal/EnhancedButton';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Slot from './../Slots/Slot';
import AraSlotService from './../Slots/AraSlotService';
import AraSlot from './../Slots/AraSlot';
import { AraSizeStyle } from './../Slots/Slots';
import { floatLeftStyle, EnhancedButtonHeight, IconStyle, TextStyle } from './Modules';
import { SortableContainer, SortEndHandler, SortEnd, SortEvent } from 'react-sortable-hoc';

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

export interface OrdarableModulesProps {
    order: ModulesOrder;
    onModuleTimesChange: ModulesOrderChangeHandler;
}

export interface ModulesTestOrderProps extends OrdarableModulesProps {
    onModulesOrderChange: ModulesOrderChangeHandler;
}

export const OrdarableModules = SortableContainer(
    class extends React.Component<OrdarableModulesProps, void> {
        public constructor(props: OrdarableModulesProps) {
            super(props);
        }

        public render(): JSX.Element {
            const modules: Array<JSX.Element> = this.props.order.map((moduleOrder: ModuleOrder): JSX.Element => {

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