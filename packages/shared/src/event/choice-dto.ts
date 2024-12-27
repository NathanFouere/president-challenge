import type { ChoiceStatus } from '@shared/event/choice-status';

export interface ChoiceDto {
  id: number;
  text: string;
  status: ChoiceStatus;
}
