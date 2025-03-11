import type { MinimalEventDto } from '@president-challenge/shared/event/minimal-event-dto.js';

export interface EventListDto {
  commonEvents: MinimalEventDto[];
  choiceEvents: MinimalEventDto[];
  superEvents: MinimalEventDto[];
}
