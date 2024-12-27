import type { ChoiceStatus } from '@shared/event/choice-status.js';

export interface ChoiceDto {
  id: number;
  text: string;
  status: ChoiceStatus;
}
