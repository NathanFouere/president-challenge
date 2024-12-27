import type { MinimalEventDto } from '@shared/event/minimal-event-dto';

export interface EventListDto {
  historicalEvents: MinimalEventDto[];
  choiceEvents: MinimalEventDto[];
  superEvents: MinimalEventDto[];
}
