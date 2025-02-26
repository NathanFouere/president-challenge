import type { MinimalEventDto } from '@shared/event/minimal-event-dto.js';

export interface EventListDto {
  commonEvents: MinimalEventDto[];
  choiceEvents: MinimalEventDto[];
  superEvents: MinimalEventDto[];
}
