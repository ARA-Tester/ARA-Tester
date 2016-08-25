export type SlotType = 'horizontal' | 'vertical' | 'merged';

export type SlotStatus = 'empty' | 'module' | 'selected';

export type AraSlotIdentifier = 'vertical1' | 'vertical2' | 'horizontal1' | 'horizontal2' | 'horizontal3' | 'horizontal4' | 'merged1' | 'merged2';

export interface AraSlot {
    identifier: AraSlotIdentifier;
    status: SlotStatus;
    index?: number;
}

export default AraSlot;