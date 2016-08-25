import * as React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Cross from 'material-ui/svg-icons/content/clear';
import Divider from 'material-ui/Divider';
import Slot from './../Slots/Slot';
import { AraSizeStyle } from './../Slots/Slots';
import { FrameColor } from './../Slots/Frame';
import { AraSlot } from './../Slots/AraSlot';
import { AraSlots } from './../Slots/AraSlotService';

const CroosSize: number = Slot.horizontalType.height / 2;

const CroosStyle: React.CSSProperties = { height: CroosSize, width: CroosSize };

const ListStyle: React.CSSProperties = Object.assign({ padding: 0 }, AraSizeStyle);

const ListItemStyle: React.CSSProperties = { height: AraSizeStyle.height / 6 };

export type RemoveModuleHandler = (index: number) => void;

export interface ModulesProps {
    modules: AraSlots;
    onRemoveModule: RemoveModuleHandler;
}

export class Modules extends React.Component<ModulesProps, void> {
    private _removeModuleFunctionFactory: (index: number) => React.MouseEventHandler;

    private _removeModule(index: number, event: React.MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
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
            items.push(
                <ListItem
                    key={index}
                    style={ListItemStyle}
                    leftIcon={Slot.getIcon(indexedSlot)}
                    rightIconButton={<IconButton onClick={_removeModuleFunctionFactory(index)} iconStyle={CroosStyle}>
                        <Cross color={FrameColor} />
                    </IconButton>}
                    primaryText={`Module ${module}`}
                />
            );
            items.push(<Divider key={index + length}/>);
        });
        return (
            <List style={ListStyle}>
               {items}
            </List>
        );
    }
}

export default Modules;