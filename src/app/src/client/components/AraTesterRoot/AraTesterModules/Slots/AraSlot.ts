export type SlotType = 'horizontal' | 'vertical' | 'merged';

export type SlotStatus = 'empty' | 'module' | 'selected';

export type AraSlotIdentifier = 'vertical1' | 'vertical2' | 'horizontal1' | 'horizontal2' | 'horizontal3' | 'horizontal4' | 'merged1' | 'merged2';

export interface SlotBase {
    type: SlotType;
    status: SlotStatus;
    index?: number;
}

export interface AraSlotBase {
    identifier: AraSlotIdentifier;
    name: string;
}

export interface AraSlot extends AraSlotBase, SlotBase {

}

export default AraSlot;