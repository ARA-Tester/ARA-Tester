import { AraSlot, AraSlotIdentifier, SlotType, SlotStatus } from './AraSlot';

export type AraSlots = Array<AraSlot>;

export type AraSlotCreator = (identifier: AraSlotIdentifier) => AraSlot;

export class AraSlotService {
    public static resolveTypeFromIdentifier(identifier: AraSlotIdentifier): SlotType {
        const stringified: string = identifier;
        return stringified.substring(0, stringified.length - 1) as SlotType;
    }

    public static isTypeVertical(type: SlotType): boolean {
        return type === 'vertical';
    }

    public static isTypeHorizontal(type: SlotType): boolean {
        return type === 'horizontal';
    }

    public static isTypeMerged(type: SlotType): boolean {
        return type === 'merged';
    }

    public static isIdentifierVertical(identifier: AraSlotIdentifier): boolean {
        return AraSlotService.isTypeVertical(AraSlotService.resolveTypeFromIdentifier(identifier));
    }

    public static isIdentifierHorizontal(identifier: AraSlotIdentifier): boolean {
        return AraSlotService.isTypeHorizontal(AraSlotService.resolveTypeFromIdentifier(identifier));
    }

    public static isIdentifierMerged(identifier: AraSlotIdentifier): boolean {
        return AraSlotService.isTypeMerged(AraSlotService.resolveTypeFromIdentifier(identifier));
    }

    public static isSlot(slot: AraSlot): boolean {
        return slot !== null;
    }

    public static isSlotVertical(slot: AraSlot): boolean {
        return AraSlotService.isIdentifierVertical(slot.identifier);
    }

    public static isSlotHorizontal(slot: AraSlot): boolean {
        return AraSlotService.isIdentifierHorizontal(slot.identifier);
    }

    public static isSlotMerged(slot: AraSlot): boolean {
        return AraSlotService.isIdentifierMerged(slot.identifier);
    }

    public static createAraSlot(status: SlotStatus, identifier: AraSlotIdentifier): AraSlot {
        return { identifier: identifier, status: status };
    }

    public static createEmptyAraSlot: AraSlotCreator = AraSlotService.createAraSlot.bind(null, 'empty');

    public static createModuleAraSlot: AraSlotCreator = AraSlotService.createAraSlot.bind(null, 'module');

    public static findSlotByIdentifier(slots: AraSlots, identifier: AraSlotIdentifier): AraSlot {
        for(let index: number = 0; index < slots.length; ++index) {
            const slot: AraSlot = slots[index];
            if(slot.identifier === identifier) {
                return Object.assign({ index: index }, slot);
            }
        }
        return null;
    }

    public static getSlotBaseForIdentifier(slots: AraSlots, identifier: AraSlotIdentifier): AraSlot {
        const araSlot: AraSlot = AraSlotService.findSlotByIdentifier(slots, identifier);
        return AraSlotService.isSlot(araSlot) ? araSlot : AraSlotService.createEmptyAraSlot(identifier);
    }
}

export default AraSlotService;