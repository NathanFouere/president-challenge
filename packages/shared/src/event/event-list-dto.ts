import type { MinimalEventDto } from '@shared/event/minimal-event-dto.js';

export interface EventListDto {
  historicalEvents: MinimalEventDto[];
  choiceEvents: MinimalEventDto[];
  superEvents: MinimalEventDto[];
}
