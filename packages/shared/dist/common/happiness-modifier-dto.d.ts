import type { HappinessModifierType } from '@president-challenge/shared/common/happiness-modifier-type.js';
export default interface HappinessModifierDto {
    id: number;
    name: string;
    description: string;
    color: string;
    amount: number;
    type: HappinessModifierType;
    duration: number | null;
}
