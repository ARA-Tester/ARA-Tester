import { AraSlot, AraSlotBase, SlotBase, AraSlotIdentifier, SlotType, SlotStatus } from './AraSlot';

export type AraSlots = Array<AraSlot>;

export type AraSlotCreator = (slot: AraSlotBase) => AraSlot;

export class AraSlotService {
    private static _identifierPredicate(identifier: AraSlotIdentifier, slot: AraSlot): boolean {
        return slot.identifier === identifier;
    }

    private static _namePredicate(name: string, slot: AraSlot): boolean {
        return slot.name === name;
    }

    private static _findSlot(slots: AraSlots, predicate: (slot: AraSlot) => boolean): AraSlot {
        for(let index: number = 0; index < slots.length; ++index) {
            const slot: AraSlot = slots[index];
            if(predicate(slot)) {
                return Object.assign({ index: index }, slot);
            }
        }
        return null;
    }

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
        return AraSlotService.isTypeVertical(slot.type);
    }

    public static isSlotHorizontal(slot: AraSlot): boolean {
        return AraSlotService.isTypeHorizontal(slot.type);
    }

    public static isSlotMerged(slot: AraSlot): boolean {
        return AraSlotService.isTypeMerged(slot.type);
    }

    public static createSlotBaseFromIdentifier(identifier: AraSlotIdentifier): SlotBase {
        return {
            type: AraSlotService.resolveTypeFromIdentifier(identifier),
            status: 'empty'
        };
    }

    public static createSlotWithStatus(status: SlotStatus, slot: AraSlotBase): AraSlot {
        const { identifier, name } = slot;
        return {
            identifier: identifier,
            name: name,
            type: AraSlotService.resolveTypeFromIdentifier(identifier),
            status: status
        }
    }

    public static createEmptySlot: AraSlotCreator = AraSlotService.createSlotWithStatus.bind(null, 'empty');

    public static createModuleSlot: AraSlotCreator = AraSlotService.createSlotWithStatus.bind(null, 'module');

    public static findSlotByName(slots: AraSlots, name: string): AraSlot {
        return AraSlotService._findSlot(slots, AraSlotService._namePredicate.bind(null, name));
    }

    public static findSlotByIdentifier(slots: AraSlots, identifier: AraSlotIdentifier): AraSlot {
        return AraSlotService._findSlot(slots, AraSlotService._identifierPredicate.bind(null, identifier));
    }

    public static stricCastAraSlotToSlotBase(araSlot: AraSlot): SlotBase {
        let slotBase: SlotBase = Object.assign({}, araSlot);
        delete araSlot.identifier;
        delete araSlot.name;
        return slotBase;
    }

    public static getSlotBaseForIdentifier(slots: AraSlots, identifier: AraSlotIdentifier): SlotBase {
        const araSlot: AraSlot = AraSlotService.findSlotByIdentifier(slots, identifier);
        return AraSlotService.isSlot(araSlot) ? AraSlotService.stricCastAraSlotToSlotBase(araSlot)
            : AraSlotService.createSlotBaseFromIdentifier(identifier);
    }
}

export default AraSlotService;