import type { ChoiceStatus } from '@president-challenge/shared/event/choice-status.js';
export interface ChoiceDto {
    id: number;
    text: string;
    status: ChoiceStatus;
}
