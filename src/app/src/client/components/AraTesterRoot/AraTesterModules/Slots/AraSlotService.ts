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

    public static createSlotFromIdentifier(identifier: AraSlotIdentifier): SlotBase {
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

    private _slots: AraSlots;

    private _findSlot(predicate: (slot: AraSlot) => boolean): AraSlot {
        const { _slots } = this;
        for(let index: number = 0; index < _slots.length; ++index) {
            const slot: AraSlot = _slots[index];
            if(predicate(slot)) {
                return Object.assign({ index: index }, slot);
            }
        }
        return null;
    }

    constructor(slots: AraSlots) {
        this.setSlots(slots);
    }

    public setSlots(slots: AraSlots): void {
        this._slots = slots;
    }

    public findSlotByIdentifier(identifier: AraSlotIdentifier): AraSlot {
        return this._findSlot(AraSlotService._identifierPredicate.bind(null, identifier));
    }

    public findSlotByName(name: string): AraSlot {
        return this._findSlot(AraSlotService._namePredicate.bind(null, name));
    }
}

export default AraSlotService;