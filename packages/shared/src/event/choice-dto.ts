import type { ChoiceStatus } from '@shared/types/event/choice-status';

export interface ChoiceDto {
  id: number;
  text: string;
  status: ChoiceStatus;
}
