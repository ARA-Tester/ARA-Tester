export type SlotType = 'horizontal' | 'vertical' | 'merged';

export type SlotStatus = 'empty' | 'module' | 'selected';

export type AraSlotIdentifier = 'vertical1' | 'vertical2' | 'horizontal1' | 'horizontal2' | 'horizontal3' | 'horizontal4' | 'merged1' | 'merged2';

export interface SlotBase {
    identifier: AraSlotIdentifier;
    status: SlotStatus;
    index?: number;
}

export interface AraSlot extends SlotBase {
    name: string;
}

export default AraSlot;