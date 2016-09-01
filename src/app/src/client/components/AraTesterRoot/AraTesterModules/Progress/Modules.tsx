import * as React from 'react';
import EnhancedButton from 'material-ui/internal/EnhancedButton';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Cross from 'material-ui/svg-icons/content/clear';
import Divider from 'material-ui/Divider';
import Slot from './../Slots/Slot';
import AraSlot from './../Slots/AraSlot';
import { AraSizeStyle } from './../Slots/Slots';
import { FrameColor } from './../Slots/Frame';
import { AraSlots, AraSlotService } from './../Slots/AraSlotService';

const { div } = React.DOM;

export function floatLeftStyle(style: React.CSSProperties): React.CSSProperties {
    return Object.assign({ float: 'left' }, style);
}

const modulesCount: number = 6;

export const EnhancedButtonHeight: number = (AraSizeStyle.height / modulesCount) - modulesCount - 1;

const EnhancedButtonStyle: React.CSSProperties = { height: EnhancedButtonHeight, width: AraSizeStyle.width };

export const IconStyle: React.CSSProperties = floatLeftStyle(Slot.iconStyle);

const TextWidth: number = AraSizeStyle.width - Slot.iconStyle.width - EnhancedButtonHeight;

export const TextStyle: React.CSSProperties = floatLeftStyle({ width: TextWidth });

const IconButtonStyle: React.CSSProperties = floatLeftStyle({ width: EnhancedButtonHeight, height: EnhancedButtonHeight });

export type RemoveModuleHandler = (index: number) => void;

export interface ModulesProps {
    modules: AraSlots;
    onRemoveModule: RemoveModuleHandler;
}

export class Modules extends React.Component<ModulesProps, void> {
    private _removeModuleFunctionFactory: (index: number) => React.MouseEventHandler;

    private _removeModule(index: number, event: React.MouseEvent): void {
        this.props.onRemoveModule(index);
    }

    private _removeModuleFactory(index: number): React.MouseEventHandler {
        return this._removeModule.bind(this, index);
    }

    public constructor(props: ModulesProps) {
        super(props);
        this._removeModuleFunctionFactory = this._removeModuleFactory.bind(this);
    }

    public render(): JSX.Element {
        const { _removeModuleFunctionFactory, props } = this;
        const { modules } = props;
        const { length } = modules;
        let items: Array<JSX.Element> = [];
        modules.forEach((slot: AraSlot, index: number) => {
            const module: number = index + 1;
            const indexedSlot: AraSlot = Object.assign({}, slot, { index: index });
            const moduleType: string = !AraSlotService.isSlotMerged(slot) ? 'single' : 'double';
            items.push(
                <EnhancedButton
                    key={index}
                    containerElement="div"
                    touchRippleColor={Slot.iconColor}
                    style={EnhancedButtonStyle}>
                        {React.cloneElement(Slot.getSlotIcon(indexedSlot), { style: IconStyle })}
                        <div style={TextStyle}>
                            <div>{`Module ${module}`}</div>
                            <div>{moduleType}</div>
                        </div>
                        <IconButton
                            touchRippleColor={FrameColor}
                            touch
                            onClick={_removeModuleFunctionFactory(index)}
                            style={IconButtonStyle}
                            iconStyle={Slot.iconStyle}
                            tooltip="do not test"
                            tooltipPosition="bottom-right">
                                <Cross color={FrameColor} />
                        </IconButton>
                </EnhancedButton>
            );
            items.push(<Divider />);
        });
        return (
            <div style={AraSizeStyle}>
               {items}
            </div>
        );
    }
}

export default Modules;