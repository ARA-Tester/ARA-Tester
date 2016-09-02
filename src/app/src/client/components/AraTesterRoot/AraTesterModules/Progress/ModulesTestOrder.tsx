import * as React from 'react';
import EnhancedButton from 'material-ui/internal/EnhancedButton';
import Avatar from 'material-ui/Avatar';
import Slot from './../Slots/Slot';
import AraSlotService from './../Slots/AraSlotService';
import AraSlot from './../Slots/AraSlot';
import { AraSizeStyle } from './../Slots/Slots';
import { FrameColor } from './../Slots/Frame';
import { fullWhite } from 'material-ui/styles/colors';
import { floatLeftStyle, EnhancedButtonStyle, IconStyle, TextStyle } from './Modules';
import { SortableElement, SortableContainer, SortEndHandler, SortEnd, SortStartHandler, SortStart, SortEvent } from 'react-sortable-hoc';
import { NumberInputField, NumberInputFieldValueHandler } from './../TextInputField/NumberInputField';

const { div } = React.DOM;

const NumberInputWidth: number = EnhancedButtonStyle.height;

const NumberInputFieldStyle: React.CSSProperties = floatLeftStyle({ width: NumberInputWidth });

const Margin: number = (EnhancedButtonStyle.height - 48) / 2;

const NumberInputStyle: React.CSSProperties = {
    fontSize: 16,
    marginTop: Margin,
    marginRight: Margin,
    backgroundColor: fullWhite
};

const NumberInputUnderlineStyle: React.CSSProperties = {
    borderColor: Slot.iconColor,
    borderBottomWidth: 3,
    bottom: 0
};

const OrdarableModuleStyle: React.CSSProperties = {
    backgroundColor: Slot.emptyColor,
    width: EnhancedButtonStyle.width,
    height: EnhancedButtonStyle.height - 7,
    marginTop: 2
}

const OrdarableModulesStyle: React.CSSProperties = Object.assign({
    backgroundColor: Slot.moduleColor
}, AraSizeStyle);

export interface ModuleOrder extends AraSlot {
    times: number;
}

export type ModulesOrder = Array<ModuleOrder>;

export type ModulesOrderChangeHandler = (index: number, times: number) => void;

export interface ModulesTestOrdereState {
    blink: boolean;
}

export interface OrdarableModuleProps extends ModulesTestOrdereState {
    order: ModuleOrder;
    onModuleTimesChange: NumberInputFieldValueHandler;
}

export interface OrdablesBaseProps {
    order: ModulesOrder;
    onModuleTimesChange: ModulesOrderChangeHandler;
}

export interface OrdarableModulesProps extends ModulesTestOrdereState, OrdablesBaseProps {

}

export interface ModulesTestOrderProps extends OrdablesBaseProps {
    onModulesOrderChange: ModulesOrderChangeHandler;
}

export const OrdarableModule = SortableElement(
    class extends React.Component<OrdarableModuleProps, void> {

        public constructor(props: OrdarableModuleProps) {
            super(props);
        }

        public render(): JSX.Element {
            const { order, onModuleTimesChange, blink } = this.props;
            const slot: AraSlot = order;
            const moduleIndex: number = slot.index + 1;
            const moduleType: string = !AraSlotService.isSlotMerged(slot) ? 'single' : 'double';
            let iconProps: any = { style: IconStyle, color: FrameColor };
            let underlineStyle: React.CSSProperties = Object.assign({}, NumberInputUnderlineStyle);
            if(blink) {
                delete iconProps.color;
            } else {
                underlineStyle.borderColor = FrameColor;
            }
            return (
                <EnhancedButton
                    containerElement="div"
                    disableFocusRipple
                    disableTouchRipple
                    style={OrdarableModuleStyle}>
                        {React.cloneElement(Slot.getSlotIcon(slot), iconProps)}
                        <div style={TextStyle}>
                            <div>{`Module ${moduleIndex}`}</div>
                            <div>{moduleType}</div>
                        </div>
                        <NumberInputField
                            id={`times-for-${slot.index}`}
                            fieldValue={order.times}
                            max={9999999}
                            onFieldValue={onModuleTimesChange}
                            style={NumberInputFieldStyle}
                            inputStyle={NumberInputStyle}
                            underlineStyle={underlineStyle}
                        />
                </EnhancedButton>
            );
        }
    }
);

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
            const { order, blink } = this.props;
            const { length } = order;
            const modules: Array<JSX.Element> = order.map((moduleOrder: ModuleOrder, index: number): JSX.Element => {
                const onModuleTimesChange: NumberInputFieldValueHandler = this._moduleTimesChangeFunctionFactory(index);
                return (
                    <OrdarableModule
                        key={index}
                        index={index}
                        blink={blink}
                        order={moduleOrder}
                        onModuleTimesChange={onModuleTimesChange}
                    />
                );
            });
            return (
                <div style={OrdarableModulesStyle}>
                    {modules}
                </div>
            );
        }
    }
);

export class ModulesTestOrder extends React.Component<ModulesTestOrderProps, ModulesTestOrdereState> {
    private _interval: number;
    private _blink: () => void;
    private _onSortStart: SortStartHandler;
    private _onSortEnd: SortEndHandler;

    private _handleBlink(): void {
        this.setState({ blink: !this.state.blink });
    }

    private _stopBlinking(): void {
        if(this._interval !== null) {
            clearInterval(this._interval);
            this._interval = null;
            this.setState({ blink: true });
        }
    }

    private _handleSortStart(sort: SortStart, event: SortEnd): void {
        this._stopBlinking();
    }

    private _handleSortEnd(sort: SortEnd, event: SortEvent): void {
        this.props.onModulesOrderChange(sort.oldIndex, sort.newIndex);
    }

    public constructor(props: ModulesTestOrderProps) {
        super(props);
        this.state = { blink: false };
        this._interval = null;
        this._blink = this._handleBlink.bind(this);
        this._onSortStart = this._handleSortStart.bind(this);
        this._onSortEnd = this._handleSortEnd.bind(this);
    }

    public componentDidMount(): void {
        this._interval = window.setInterval(this._blink, 1000);
    }

    public componentWillReceiveProps(props: ModulesTestOrderProps): void {
        this._stopBlinking();
    }

    public componentWillUnmount(): void {
        this._stopBlinking();
    }

    public render(): JSX.Element {
        const { props, state, _onSortStart, _onSortEnd } = this;
        const { order, onModuleTimesChange } = props;
        return (
            <OrdarableModules
                order={order}
                blink={state.blink}
                onSortStart={_onSortStart}
                onSortEnd={_onSortEnd}
                onModuleTimesChange={onModuleTimesChange}
            />
        );
    }
}

export default ModulesTestOrder;